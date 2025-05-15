/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const appointment = await db.appointment.findUnique({
        where: { id: (await params).id },
    });
    return NextResponse.json(appointment);
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const data = await req.json();

    const updated = await db.appointment.update({
        where: { id: (await params).id },
        data,
    });

    return NextResponse.json(updated);
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await db.appointment.delete({ where: { id: (await params).id } });
    return NextResponse.json({ success: true });
}
