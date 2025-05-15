'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { login, signup } from './actions';
import { LoadingData } from 'src/contexts/loading';
import { Button } from 'src/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { load } = LoadingData();

    const query = Object.fromEntries(searchParams.entries()) as Record<
        string,
        string
    >;

    const email = query.email;
    const password = query.password;

    const [error, setError] = useState<string | undefined>(
        query.error_description ?? undefined
    );

    const loginHandler = (formData: FormData) => {
        setError(undefined);
        load(() => login(formData), {
            then() {
                router.push('/dashboard');
            },
            catch(error: { code?: string }) {
                if (error.code === 'email_not_confirmed') {
                    router.push('/confirm_email');
                } else
                    setError(
                        ((error as { message?: string })?.message ??
                            error ??
                            'An error occurred') as string
                    );
            },
        })();
    };

    const signupHandler = (formData: FormData) => {
        setError(undefined);
        load(() => signup(formData), {
            then(user) {
                if (user?.email_confirmed_at) router.push('/dashboard');
                else router.push('/confirm_email');
            },
            catch(error) {
                setError(
                    ((error as { message?: string })?.message ??
                        error ??
                        'An error occurred') as string
                );
            },
        })();
    };

    return (
        <div className="pt-4 mx-auto max-w-min">
            <h1 className="m-4 text-3xl font-semibold cursor-default text-center">
                Connecting..
            </h1>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                    >
                        Email:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={email ?? ''}
                        required
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex flex-col">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        defaultValue={password ?? ''}
                        required
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex space-x-4 justify-around">
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            loginHandler(new FormData(e.currentTarget.form!));
                        }}
                        type="button"
                        className="cursor-pointer"
                    >
                        Log in
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            signupHandler(new FormData(e.currentTarget.form!));
                        }}
                        type="button"
                        className="cursor-pointer"
                    >
                        Sign up
                    </Button>
                </div>
            </form>
            <div className="flex flex-col-reverse gap-2 text-sm w-3/4 mt-5 text-center absolute left-1/2 -translate-x-1/2">
                <Link href="/forgot_password">Forgot password?</Link>
                {error && (
                    <p className="text-red-500 opacity-90 cursor-default">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
