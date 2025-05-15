/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const billings = await db.billing.findMany();
    return NextResponse.json(billings);
}

export async function POST(req: Request) {
    const data = await req.json();

    const billing = await db.billing.create({
        data,
    });

    return NextResponse.json(billing);
}
