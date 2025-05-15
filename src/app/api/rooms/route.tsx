/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const rooms = await db.room.findMany();
    return NextResponse.json(rooms);
}

export async function POST(req: Request) {
    const data = await req.json();

    const room = await db.room.create({
        data,
    });

    return NextResponse.json(room);
}
