'use client';

import { useState } from 'react';
import DashboardContent from '~/components/ui/dashboard-content';
import type { Billing } from '@prisma/client';

export default function BillingsPage() {
    const [billings, setBillings] = useState<Billing[]>([]);

    const fetchBillings = async () => {
        const res = await fetch('/api/billings');
        const data = (await res.json()) as Billing[];
        setBillings(data);
    };

    return (
        <DashboardContent
            list={billings}
            setList={setBillings}
            fetchList={fetchBillings}
            title="Billings"
            apiRoute="billings"
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
                    name: 'Amount',
                    keyName: 'amount',
                    type: 'float',
                    defaultValue: 100,
                    placeholder: 'Enter the amount.',
                    required: true,
                },
                {
                    name: 'Status',
                    keyName: 'status',
                    type: 'choice',
                    choices: ['Paid', 'Pending'],
                    defaultValue: '',
                    required: true,
                },
            ]}
            getElementFieldTexts={function (
                billing: Billing,
                entityData: Record<string, [string, string][]>
            ) {
                return [
                    entityData.patient?.find(
                        ([id]) => id == billing.patientId
                    )?.[1] ?? 'Loading Patient..',
                    `${String(billing.amount)} FCFA`,
                    billing.status,
                ];
            }}
        />
    );
}
