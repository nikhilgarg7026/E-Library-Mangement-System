// app/api/books/route.js

import prisma from '../../../../../utils/prismaClient';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || '';
  const author = searchParams.get('author') || '';
  const sort = searchParams.get('sort') || 'title'; // Default sort by title
  const order = searchParams.get('order') || 'asc'; // Default order

  const books = await prisma.book.findMany({
    where: {
      title: {
        contains: title || '', // Allow empty title search
      },
      author: {
        contains: author || '', // Allow empty author search
      },
    },
    orderBy: {
      [sort]: order === 'asc' ? 'asc' : 'desc',
    },
  });
  

  return new Response(JSON.stringify(books), { status: 200 });
}
