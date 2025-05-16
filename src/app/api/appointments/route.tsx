/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const appointments = await db.appointment.findMany();
    return NextResponse.json(appointments);
}

export async function POST(req: Request) {
    const data = await req.json();

    const appointment = await db.appointment.create({
        data,
    });

    return NextResponse.json(appointment);
}
