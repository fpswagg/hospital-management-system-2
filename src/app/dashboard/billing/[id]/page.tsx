'use client';

import { useState } from 'react';
import DashboardEditor from '~/components/ui/dashboard-editor';
import type { Billing } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function BillingPage() {
    const [billing, setBilling] = useState<Billing | null>(null);
    const { id } = useParams();

    const fetchBilling = async () => {
        const res = await fetch(`/api/billings/${id as string}`);
        const data = (await res.json()) as Billing;
        setBilling(data);
    };

    return (
        <DashboardEditor
            id={id as string}
            element={billing}
            setElement={setBilling}
            fetchElement={fetchBilling}
            title="Billing"
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
        />
    );
}
