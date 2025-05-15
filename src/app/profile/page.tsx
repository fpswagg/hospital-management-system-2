'use client';

import { useRouter } from 'next/navigation';

import { AuthData } from '~/contexts/auth';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function ProfilePage() {
    const { user, supabase } = AuthData();

    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="max-w-md mx-auto mt-12">
            <Card className="cursor-default">
                <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        <strong>Email:</strong> {user?.email ?? ''}
                    </p>
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="cursor-pointer"
                    >
                        Log Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
