/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const patients = await db.patient.findMany();
    return NextResponse.json(patients);
}

export async function POST(req: Request) {
    const data = await req.json();

    const patient = await db.patient.create({
        data,
    });

    return NextResponse.json(patient);
}
