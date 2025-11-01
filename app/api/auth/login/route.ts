import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateOTP } from '@/lib/auth';
import { sendOTP } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const { username, phone } = await request.json();

    if (!username || !phone) {
      return NextResponse.json(
        { error: 'Username and phone are required' },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z]+$/.test(username)) {
      return NextResponse.json(
        { error: 'Username must contain only letters' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { username, phone },
      });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.oTP.deleteMany({
      where: { phone },
    });

    await prisma.oTP.create({
      data: {
        phone,
        code: otp,
        expiresAt,
      },
    });

    await sendOTP(phone, otp);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      devOTP: process.env.NODE_ENV === 'development' ? otp : undefined,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
