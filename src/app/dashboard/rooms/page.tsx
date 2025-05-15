'use client';

import { useState } from 'react';
import DashboardContent from '~/components/ui/dashboard-content';
import type { Room } from '@prisma/client';

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([]);

    const fetchRooms = async () => {
        const res = await fetch('/api/rooms');
        const data = (await res.json()) as Room[];
        setRooms(data);
    };

    return (
        <DashboardContent
            list={rooms}
            setList={setRooms}
            fetchList={fetchRooms}
            title="Rooms"
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
            getElementFieldTexts={function (room: Room) {
                return [room.roomNumber, room.type, room.status];
            }}
        />
    );
}
