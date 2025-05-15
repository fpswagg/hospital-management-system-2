'use client';

import { useState } from 'react';
import DashboardEditor from '~/components/ui/dashboard-editor';
import type { Doctor } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function DoctorPage() {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const { id } = useParams();

    const fetchDoctor = async () => {
        const res = await fetch(`/api/doctors/${id as string}`);
        const data = (await res.json()) as Doctor;
        setDoctor(data);
    };

    return (
        <DashboardEditor
            id={id as string}
            element={doctor}
            setElement={setDoctor}
            fetchElement={fetchDoctor}
            title="Doctor"
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
                    name: 'Specialty',
                    keyName: 'specialty',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter his specialty.',
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
                {
                    name: 'Available',
                    keyName: 'available',
                    type: 'check',
                },
            ]}
        />
    );
}
