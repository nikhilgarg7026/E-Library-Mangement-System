// src/app/api/books/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '../../../../utils/prismaClient'; // Adjust the path based on your project structure

export async function POST(req) {
  try {
    // Disable the body parser
    const formData = await req.formData();

    // Get the fields from the form data
    const title = formData.get('title');
    const author = formData.get('author');
    const isbn = formData.get('isbn');
    const publishedDate = formData.get('publishedDate');
    const status = formData.get('status');
    var price = formData.get('price');
    const rating = formData.get('rating');
    const link = formData.get('link');
    const imageFile = formData.get('image');

    // Validate required fields
    if (!title || !author || !isbn || !status || !imageFile) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Convert price to float if it's a string
    if (price !== null && typeof price === 'string') {
      price = parseFloat(price);
    }

    // Create directory for uploads if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the image file
    const filePath = path.join(uploadDir, imageFile.name);
    const buffer = await imageFile.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    // Create the book data object
    const bookData = {
      title,
      author,
      image: `/uploads/${imageFile.name}`,
      isbn,
      status,
      link,
      price,
      rating: rating ? parseInt(rating, 10) : undefined,
      publishedDate: publishedDate ? new Date(publishedDate) : null,
    };

    // Validate book data before creating

    if (publishedDate && isNaN(bookData.publishedDate.getTime())) {
      return NextResponse.json({ message: 'Invalid published date' }, { status: 400 });
    }

    // Store the book data in the database
    const book = await prisma.book.create({ data: bookData });

    // Respond with the created book data
    return NextResponse.json({ message: 'Book added successfully', data: book }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ message: 'Failed to add book', error: error.message }, { status: 500 });
  }
}

// Configure to disable body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};



// GET method to retrieve all books
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return new Response(JSON.stringify({ message: 'Failed to retrieve books' }), { status: 500 });
  }
}
