'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '~/components/ui/button';

export default function ConfirmEmail() {
    const searchParams = useSearchParams();

    const error = searchParams.get('error');
    // const error_code = searchParams.get('error_code');
    const error_description = searchParams.get('error_description');

    // error: access_denied

    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-10">
                <div className="cursor-default max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                    <h1
                        className={
                            error
                                ? 'text-2xl font-bold text-red-500 mb-4'
                                : 'text-2xl font-bold text-gray-800 mb-4'
                        }
                    >
                        {error
                            ? 'Failed to confirm email!'
                            : 'Email Confirmed!'}
                    </h1>
                    <p className={error ? 'text-black' : 'text-gray-600 mb-6'}>
                        {error
                            ? error_description
                            : 'Thank you for confirming your email. You can now proceed to use our services.'}
                    </p>
                    {!error && (
                        <Link href="/dashboard">
                            <Button className="px-4 py-2 cursor-pointer">
                                Go to Dashboard
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
