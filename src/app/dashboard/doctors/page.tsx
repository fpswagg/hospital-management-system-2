'use client';

import { useState } from 'react';
import DashboardContent from '~/components/ui/dashboard-content';
import type { Doctor } from '@prisma/client';

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const fetchDoctors = async () => {
        const res = await fetch('/api/doctors');
        const data = (await res.json()) as Doctor[];
        setDoctors(data);
    };

    return (
        <DashboardContent
            list={doctors}
            setList={setDoctors}
            fetchList={fetchDoctors}
            title="Doctors"
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
            getElementFieldTexts={function (doctor: Doctor) {
                return [
                    doctor.name,
                    doctor.specialty ?? '',
                    doctor.phone ?? '',
                    doctor.email ?? '',
                    `Status: ${doctor.available ? 'Available' : 'Unavailable'}`,
                ];
            }}
        />
    );
}
