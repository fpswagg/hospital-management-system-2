'use client';

import { useState } from 'react';
import DashboardEditor from '~/components/ui/dashboard-editor';
import type { MedicalRecord } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function MedicalRecordPage() {
    const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(
        null
    );
    const { id } = useParams();

    const fetchMedicalRecord = async () => {
        const res = await fetch(`/api/medical_records/${id as string}`);
        const data = (await res.json()) as MedicalRecord;
        setMedicalRecord(data);
    };

    return (
        <DashboardEditor
            id={id as string}
            element={medicalRecord}
            setElement={setMedicalRecord}
            fetchElement={fetchMedicalRecord}
            title="Medical Record"
            elementFields={[
                {
                    name: 'Patient',
                    keyName: 'patientId',
                    type: 'entity',
                    entity: 'patient',
                    placeholder: 'Select patient.',
                    required: true,
                },
                {
                    name: 'Diagnosis',
                    keyName: 'diagnosis',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter a diagnosis.',
                    required: true,
                },
                {
                    name: 'Treatment',
                    keyName: 'treatment',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter a treatment.',
                    required: true,
                },
            ]}
        />
    );
}
