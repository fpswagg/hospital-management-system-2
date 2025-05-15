'use client';

import { DashboardSidebar } from '~/components/ui/dashboard-sidebar';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex">
            <DashboardSidebar current={pathname} />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
