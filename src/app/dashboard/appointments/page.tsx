'use client';

import { useState } from 'react';
import DashboardContent from '~/components/ui/dashboard-content';
import type { Appointment } from '@prisma/client';

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const fetchAppointments = async () => {
        const res = await fetch('/api/appointments');
        const data = (await res.json()) as Appointment[];
        setAppointments(data);
    };

    return (
        <DashboardContent
            list={appointments}
            setList={setAppointments}
            fetchList={fetchAppointments}
            title="Appointments"
            apiRoute="appointments"
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
                    name: 'Doctor',
                    keyName: 'doctorId',
                    type: 'entity',
                    entity: 'doctor',
                    placeholder: 'Select doctor.',
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
            getElementFieldTexts={function (
                appointment: Appointment,
                entityData: Record<string, [string, string][]>
            ) {
                return [
                    entityData.patient?.find(
                        ([id]) => id == appointment.patientId
                    )?.[1] ?? 'Loading Patient..',
                    entityData.doctor?.find(
                        ([id]) => id == appointment.doctorId
                    )?.[1] ?? 'Loading Doctor..',
                    new Date(appointment.time).toLocaleString(),
                    appointment.status,
                ];
            }}
        />
    );
}
