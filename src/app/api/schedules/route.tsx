/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const schedules = await db.schedule.findMany();
    return NextResponse.json(schedules);
}

export async function POST(req: Request) {
    const data = await req.json();

    const schedule = await db.schedule.create({
        data,
    });

    return NextResponse.json(schedule);
}
