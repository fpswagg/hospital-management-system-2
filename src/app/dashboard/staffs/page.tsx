'use client';

import { useState } from 'react';
import DashboardContent from '~/components/ui/dashboard-content';
import type { Staff } from '@prisma/client';

export default function StaffsPage() {
    const [staffs, setStaffs] = useState<Staff[]>([]);

    const fetchStaffs = async () => {
        const res = await fetch('/api/staffs');
        const data = (await res.json()) as Staff[];
        setStaffs(data);
    };

    return (
        <DashboardContent
            list={staffs}
            setList={setStaffs}
            fetchList={fetchStaffs}
            title="Staffs"
            elementFields={[
                {
                    name: 'Name',
                    keyName: 'name',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter a name.',
                    required: true,
                },
                {
                    name: 'Role',
                    keyName: 'role',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter his role.',
                    required: true,
                },
                {
                    name: 'Phone',
                    keyName: 'phone',
                    type: 'phone',
                    defaultValue: '',
                    placeholder: 'Enter an phone number.',
                },
                {
                    name: 'Email',
                    keyName: 'email',
                    type: 'email',
                    defaultValue: '',
                    placeholder: 'Enter an email address.',
                },
            ]}
            getElementFieldTexts={function (staff: Staff) {
                return [
                    staff.name,
                    staff.role ?? '',
                    staff.phone ?? '',
                    staff.email ?? '',
                ];
            }}
        />
    );
}
