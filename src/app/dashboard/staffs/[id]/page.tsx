'use client';

import { useState } from 'react';
import DashboardEditor from '~/components/ui/dashboard-editor';
import type { Staff } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function StaffPage() {
    const [staff, setStaff] = useState<Staff | null>(null);
    const { id } = useParams();

    const fetchStaff = async () => {
        const res = await fetch(`/api/staffs/${id as string}`);
        const data = (await res.json()) as Staff;
        setStaff(data);
    };

    return (
        <DashboardEditor
            id={id as string}
            element={staff}
            setElement={setStaff}
            fetchElement={fetchStaff}
            title="Staff"
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
        />
    );
}
