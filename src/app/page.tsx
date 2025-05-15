'use client';

import Link from 'next/link';

import { AuthData } from '~/contexts/auth';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function HomePage() {
    const { user } = AuthData();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-background text-center">
            <div className="max-w-3xl space-y-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl cursor-default mt-10">
                    Welcome to{' '}
                    <span className="text-primary">Kerry&apos;s Tool</span>
                </h1>
                <p className="text-muted-foreground text-lg cursor-default">
                    A modern Hospital Management System to streamline patient
                    care, appointments, staff coordination, and more.
                </p>

                <div className="flex justify-center gap-4">
                    {user ? (
                        <Button asChild className="cursor-pointer">
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                    ) : (
                        <Button asChild className="cursor-pointer">
                            <Link href="/login">Get Started</Link>
                        </Button>
                    )}
                    <Button
                        variant="secondary"
                        asChild
                        className="cursor-pointer"
                    >
                        <Link href="/about">Learn More</Link>
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 my-10 cursor-default mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Records</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Easily manage and search patient medical histories
                            and documentation.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Appointments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Schedule, track, and coordinate appointments between
                            doctors and patients.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Staff Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Control staff roles, schedules, and access to system
                            modules.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing & Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Manage payments, generate reports, and access
                            analytics in real time.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
