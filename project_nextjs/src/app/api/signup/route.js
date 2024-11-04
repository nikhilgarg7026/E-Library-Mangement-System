import prisma from '../../../../utils/prismaClient';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, userType } =await req.json();
    
    try {
      // check email is used or not
      const data = await prisma.user.findUnique({
        where: { email: email},
      });
      if (data) {
        return new Response(JSON.stringify({ success: false, message: 'This email is already used' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          userType,
        },
      });

      // res.status(201).json({ success: true, userId: newUser.id });
      return new Response(JSON.stringify({ success: true, data: newUser }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return new Response(`Method ${req.method} Not Allowed`, {
      status: 405,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
