import { NextResponse } from 'next/server';
import prisma from '../../../../utils/prismaClient';

export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
