'use client';

import { useState } from 'react';
import DashboardContent from '~/components/ui/dashboard-content';
import type { Patient } from '@prisma/client';

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);

    const fetchPatients = async () => {
        const res = await fetch('/api/patients');
        const data = (await res.json()) as Patient[];
        setPatients(data);
    };

    return (
        <DashboardContent
            list={patients}
            setList={setPatients}
            fetchList={fetchPatients}
            title="Patients"
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
                    name: 'Age',
                    keyName: 'age',
                    type: 'number',
                    defaultValue: 21,
                    placeholder: 'Enter an age.',
                    required: true,
                },
                {
                    name: 'Gender',
                    keyName: 'gender',
                    type: 'choice',
                    choices: ['Male', 'Female'],
                    placeholder: 'Select a gender.',
                    required: true,
                },
                {
                    name: 'Address',
                    keyName: 'address',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter an address.',
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
            getElementFieldTexts={function (patient: Patient) {
                return [
                    patient.name,
                    `${patient.age} years old, ${patient.gender ?? ''}`,
                    patient.address ?? '',
                    patient.phone ?? '',
                    patient.email ?? '',
                ];
            }}
        />
    );
}
