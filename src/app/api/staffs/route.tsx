/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const staffs = await db.staff.findMany();
    return NextResponse.json(staffs);
}

export async function POST(req: Request) {
    const data = await req.json();

    const staff = await db.staff.create({
        data,
    });

    return NextResponse.json(staff);
}
