'use client';

import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function ConfirmEmail() {
    return (
        <>
            <div>
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="cursor-default max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            Email Confirmed!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Thank you for confirming your email. You can now
                            proceed to use our services.
                        </p>
                        <Link href="/dashboard">
                            <Button className="px-4 py-2 cursor-pointer">
                                Go to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
