import { NextResponse } from 'next/server';
import prisma from '../../../../utils/prismaClient';
import bcrypt from 'bcryptjs';

export async function PUT(req) {
    const { id, data } = await req.json();
  
    const updateData = { ...data };
    if (!data.password) {
      delete updateData.password; // Remove password from updateData if it's not provided
    }
    else{
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
      // const newUser = await prisma.user.create({
      //   data: {
      //     password: hashedPassword,
      //   },
      // });

    }
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: updateData,
      });
      return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ messsage: 'Failed to update user' }, { status: 500 });
    }
  }
