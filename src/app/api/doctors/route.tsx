/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const doctors = await db.doctor.findMany();
    return NextResponse.json(doctors);
}

export async function POST(req: Request) {
    const data = await req.json();

    const doctor = await db.doctor.create({
        data,
    });

    return NextResponse.json(doctor);
}
