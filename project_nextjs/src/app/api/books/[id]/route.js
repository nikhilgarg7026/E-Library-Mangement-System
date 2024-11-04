import prisma from '../../../../../utils/prismaClient';
import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });

    if (!book) {
      return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    console.error('Error fetching book:', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve book' }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const formData = await request.formData();

    // Get the fields from the form data
    const title = formData.get('title');
    const author = formData.get('author');
    const isbn = formData.get('isbn');
    const publishedDate = formData.get('publishedDate');
    const status = formData.get('status');
    const rating = formData.get('rating');
    const link = formData.get('link');
    const imageFile = formData.get('image');
    const price = formData.get('price');

        // Create directory for uploads if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the image file
    const filePath = path.join(uploadDir, imageFile.name);
    const buffer = await imageFile.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Validate required fields
    if (!title || !author || !isbn || availableCopies === undefined) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const updatedData = {
      title,
      author,
      isbn,
      status,
      price,
      link: link || null, // Optional field
      rating: rating ? parseInt(rating, 10) : null, // Optional field
      publishedDate: publishedDate ? new Date(publishedDate) : null, // Optional field
      image: `/uploads/${imageFile.name}` || null, // Optional field
    };

    // Validate availableCopies
    if (isNaN(updatedData.availableCopies) || updatedData.availableCopies < 1) {
      return new Response(JSON.stringify({ message: 'Invalid available copies' }), { status: 400 });
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: updatedData,
    });

    return new Response(JSON.stringify(updatedBook), { status: 200 });
  } catch (error) {
    console.error('Error updating book:', error);
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Failed to update book' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.book.delete({
      where: { id: Number(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting book:', error);
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Failed to delete book' }), { status: 500 });
  }
}
