'use client';

import Link from 'next/link';
import { cn } from '~/lib/utils';

const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/patients', label: 'Patients' },
    { href: '/dashboard/doctors', label: 'Doctors' },
    { href: '/dashboard/staffs', label: 'Staffs' },
    { href: '/dashboard/appointments', label: 'Appointments' },
    { href: '/dashboard/billing', label: 'Billing' },
    { href: '/dashboard/rooms', label: 'Rooms' },
    { href: '/dashboard/medical_records', label: 'Medical Records' },
];

export function DashboardSidebar({ current }: { current: string }) {
    return (
        <aside className="w-60 min-h-screen border-r px-4 py-6 bg-background">
            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            'block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition',
                            current === link.href
                                ? 'bg-muted text-primary font-semibold'
                                : 'text-muted-foreground'
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
