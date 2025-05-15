'use client';

import { useEffect, useState } from 'react';

import { createClient } from '~/utils/supabase/client';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

export default function UpdatePasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        // Ensure Supabase reads the token from the URL hash on load
        void supabase.auth.getSession();
    }, [supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            console.error(error);
            setStatus('error');
        } else {
            setStatus('success');
        }

        setLoading(false);
    };

    return (
        <div className="max-w-sm mx-auto mt-12 p-6 border rounded-md shadow-sm bg-background">
            <h1 className="text-2xl font-semibold mb-4 cursor-default">
                Set New Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="password" className="mb-2">
                        New Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="********"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer"
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </Button>
                {status === 'success' && (
                    <p className="text-sm text-green-600 mt-2 cursor-default">
                        Password updated! You can now log in.
                    </p>
                )}
                {status === 'error' && (
                    <p className="text-sm text-red-600 mt-2 cursor-default">
                        Something went wrong. Please try again.
                    </p>
                )}
            </form>
        </div>
    );
}
