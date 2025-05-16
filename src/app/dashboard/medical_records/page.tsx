'use client';

import { useState } from 'react';
import DashboardContent from '~/components/ui/dashboard-content';
import type { MedicalRecord } from '@prisma/client';

export default function MedicalRecordsPage() {
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

    const fetchMedicalRecords = async () => {
        const res = await fetch('/api/medical_records');
        const data = (await res.json()) as MedicalRecord[];
        setMedicalRecords(data);
    };

    return (
        <DashboardContent
            list={medicalRecords}
            setList={setMedicalRecords}
            fetchList={fetchMedicalRecords}
            title="Medical Records"
            apiRoute="medical_records"
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
            getElementFieldTexts={function (
                medicalRecord: MedicalRecord,
                entityData: Record<string, [string, string][]>
            ) {
                return [
                    entityData.patient?.find(
                        ([id]) => id == medicalRecord.patientId
                    )?.[1] ?? 'Loading Patient..',
                    medicalRecord.diagnosis,
                    medicalRecord.treatment,
                ];
            }}
        />
    );
}
