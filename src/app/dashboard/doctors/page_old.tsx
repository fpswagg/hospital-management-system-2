'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Doctor } from '@prisma/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { LoadingData } from '~/contexts/loading';

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [available, setAvailable] = useState(true);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();
    const { load } = LoadingData();

    const fetchDoctors = () => {
        setFetching(true);
        void (async () => {
            const res = await fetch('/api/doctors');
            const data = (await res.json()) as Doctor[];
            setDoctors(data);
            setFetching(false);
        })();
    };

    useEffect(fetchDoctors, []);

    const handleCreate = load(
        () =>
            fetch('/api/doctors', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    specialty,
                    phone,
                    email,
                    available,
                }),
                headers: { 'Content-Type': 'application/json' },
            }),
        {
            then() {
                fetchDoctors();
                setName('');
                setSpecialty('');
                setPhone('');
                setEmail('');
                setAvailable(true);
            },
        }
    );

    const handleDelete = (id: string) =>
        load(() => fetch(`/api/doctors/${id}`, { method: 'DELETE' }), {
            then: fetchDoctors,
        })();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Doctors</h1>

            <Card>
                <CardHeader>
                    <CardTitle className="cursor-default">
                        Add a New Doctor
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter doctor name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="specialty">Specialty</Label>
                            <Input
                                id="specialty"
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                placeholder="Enter specialty"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
                                type="text"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="available">Available</Label>
                            <input
                                id="available"
                                type="checkbox"
                                checked={available}
                                onChange={(e) => setAvailable(e.target.checked)}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                onClick={handleCreate}
                                className="w-full cursor-pointer disabled:cursor-default"
                                disabled={fetching}
                            >
                                {fetching ? 'Loading...' : 'Add Doctor'}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {fetching ? (
                <Card>
                    <CardContent className="cursor-default">
                        Loading...
                    </CardContent>
                </Card>
            ) : (
                <ul className="space-y-4">
                    {doctors.map((doc: Doctor) => (
                        <Card key={doc.id}>
                            <CardContent className="flex justify-between items-center cursor-default">
                                <div>
                                    <p className="font-medium text-lg">
                                        {doc.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {doc.specialty}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {doc.phone}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {doc.email}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Status:{' '}
                                        {doc.available
                                            ? 'Available'
                                            : 'Unavailable'}
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/doctors/${doc.id}`
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(doc.id)}
                                        className="cursor-pointer"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </ul>
            )}
        </div>
    );
}
