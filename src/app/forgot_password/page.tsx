'use client';

import { useState } from 'react';

import { createClient } from '~/utils/supabase/client';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/update-password`,
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
                Forgot Password
            </h1>
            <form onSubmit={handleReset} className="space-y-4">
                <div>
                    <Label htmlFor="email" className="mb-2">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer"
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
                {status === 'success' && (
                    <p className="text-sm text-green-600 mt-2 cursor-default">
                        Password reset link sent! Check your email.
                    </p>
                )}
                {status === 'error' && (
                    <p className="text-sm text-red-600 mt-2 cursor-default">
                        Something went wrong. Try again.
                    </p>
                )}
            </form>
        </div>
    );
}
