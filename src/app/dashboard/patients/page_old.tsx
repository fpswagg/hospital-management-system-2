'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Patient } from '@prisma/client';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { LoadingData } from '~/contexts/loading';

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState(21);
    const [gender, setGender] = useState('Other');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [fetching, setFetching] = useState(true);
    const router = useRouter();
    const { load } = LoadingData();

    const fetchPatients = () => {
        setFetching(true);
        void (async () => {
            const res = await fetch('/api/patients');
            const data = (await res.json()) as Patient[];
            setPatients(data);
            setFetching(false);
        })();
    };

    useEffect(fetchPatients, []);

    const handleCreate = load(
        () =>
            fetch('/api/patients', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    age,
                    gender,
                    address,
                    phone,
                    email,
                }),
                headers: { 'Content-Type': 'application/json' },
            }),
        {
            then() {
                fetchPatients();
                setName('');
                setAge(0);
                setGender('Other');
                setAddress('');
                setPhone('');
                setEmail('');
            },
        }
    );

    const handleDelete = (id: string) =>
        load(() => fetch(`/api/patients/${id}`, { method: 'DELETE' }), {
            then: fetchPatients,
        })();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Patients</h1>

            <Card>
                <CardHeader>
                    <CardTitle className="cursor-default">
                        Add a New Patient
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter patient name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                placeholder="Enter age"
                                min={1}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="border rounded px-3 py-2 appearance-none cursor-pointer"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (
                                        /^(\+|\d)[0-9 ]*$/.test(value) ||
                                        !value
                                    ) {
                                        setPhone(value);
                                    }
                                }}
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
                        <div className="flex items-end">
                            <Button
                                onClick={handleCreate}
                                className="w-full cursor-pointer disabled:cursor-default"
                                disabled={fetching}
                            >
                                {fetching ? 'Loading...' : 'Add Patient'}
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
                    {patients.map((p: Patient) => (
                        <Card key={p.id}>
                            <CardContent className="flex justify-between items-center cursor-default">
                                <div>
                                    <p className="font-medium text-lg">
                                        {p.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {p.age} years old, {p.gender}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {p.address}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {p.phone}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {p.email}
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            router.push(
                                                `/dashboard/patients/${p.id}`
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(p.id)}
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
