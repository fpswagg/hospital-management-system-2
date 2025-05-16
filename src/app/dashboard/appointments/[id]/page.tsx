'use client';

import { useState } from 'react';
import DashboardEditor from '~/components/ui/dashboard-editor';
import type { Appointment } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function AppointmentPage() {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const { id } = useParams();

    const fetchAppointment = async () => {
        const res = await fetch(`/api/appointments/${id as string}`);
        const data = (await res.json()) as Appointment;
        setAppointment(data);
    };

    return (
        <DashboardEditor
            id={id as string}
            element={appointment}
            setElement={setAppointment}
            fetchElement={fetchAppointment}
            title="Appointment"
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
                    name: 'Appointment',
                    keyName: 'appointmentId',
                    type: 'entity',
                    entity: 'appointment',
                    placeholder: 'Select appointment.',
                    required: true,
                },
                {
                    name: 'Time',
                    keyName: 'time',
                    type: 'datetime',
                    placeholder: 'Enter the time.',
                    required: true,
                },
                {
                    name: 'Status',
                    keyName: 'status',
                    type: 'choice',
                    choices: ['Scheduled', 'Completed', 'Cancelled'],
                    defaultValue: 'Scheduled',
                    required: true,
                },
            ]}
        />
    );
}
