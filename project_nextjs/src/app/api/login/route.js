import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  if (req.method === 'POST') {
    const { email, password } = await req.json();

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return new Response(JSON.stringify({ success: false, message: 'User not found' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Compare the passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Optionally, set a session or JWT here
      return new Response(JSON.stringify({ success: true, data: user}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error during login:', error);
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
    });  }
}
