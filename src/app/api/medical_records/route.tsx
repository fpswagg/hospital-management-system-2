/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const medicalRecords = await db.medicalRecord.findMany();
    return NextResponse.json(medicalRecords);
}

export async function POST(req: Request) {
    const data = await req.json();

    const medicalRecord = await db.medicalRecord.create({
        data,
    });

    return NextResponse.json(medicalRecord);
}
