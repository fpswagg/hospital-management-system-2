'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardEditor from '~/components/ui/dashboard-editor';
import type { Patient } from '@prisma/client';

export default function PatientPage() {
    const [patient, setPatient] = useState<Patient | null>(null);
    const { id } = useParams();

    const fetchPatient = async () => {
        const res = await fetch(`/api/patients/${id as string}`);
        const data = (await res.json()) as Patient;
        setPatient(data);
    };

    return (
        <DashboardEditor
            id={id as string}
            element={patient}
            setElement={setPatient}
            fetchElement={fetchPatient}
            title="Patient"
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
        />
    );
}
