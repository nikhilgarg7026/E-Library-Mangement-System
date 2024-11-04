import { NextResponse } from 'next/server';
import prisma from '../../../../utils/prismaClient';

export async function DELETE(req) {
  const { id } = await req.json();

  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
