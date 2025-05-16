import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pass = searchParams.get('pass');

    if (pass === process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: true, message: 'Access granted' });
    } else {
        return NextResponse.json(
            { success: false, message: 'Access denied' },
            { status: 401 }
        );
    }
}
