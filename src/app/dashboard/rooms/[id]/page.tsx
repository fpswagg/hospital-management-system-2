'use client';

import { useState } from 'react';
import DashboardEditor from '~/components/ui/dashboard-editor';
import type { Room } from '@prisma/client';
import { useParams } from 'next/navigation';

export default function RoomPage() {
    const [room, setRoom] = useState<Room | null>(null);
    const { id } = useParams();

    const fetchRoom = async () => {
        const res = await fetch(`/api/rooms/${id as string}`);
        const data = (await res.json()) as Room;
        setRoom(data);
    };

    return (
        <DashboardEditor
            id={id as string}
            element={room}
            setElement={setRoom}
            fetchElement={fetchRoom}
            title="Room"
            elementFields={[
                {
                    name: 'Room Number',
                    keyName: 'roomNumber',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter a room number.',
                    required: true,
                },
                {
                    name: 'Type',
                    keyName: 'type',
                    type: 'string',
                    defaultValue: '',
                    placeholder: 'Enter a type.',
                    required: true,
                },
                {
                    name: 'Status',
                    keyName: 'status',
                    type: 'choice',
                    defaultValue: 'Available',
                    choices: ['Available', 'Unavailable'],
                },
            ]}
        />
    );
}
