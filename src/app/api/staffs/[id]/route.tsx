/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from '~/server/db';
import { NextResponse } from 'next/server';

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const staff = await db.staff.findUnique({
        where: { id: (await params).id },
    });
    return NextResponse.json(staff);
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const data = await req.json();

    const updated = await db.staff.update({
        where: { id: (await params).id },
        data,
    });

    return NextResponse.json(updated);
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await db.staff.delete({ where: { id: (await params).id } });
    return NextResponse.json({ success: true });
}
