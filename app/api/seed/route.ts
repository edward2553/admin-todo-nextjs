import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: Request) {
  await prisma.todos.deleteMany();

  await prisma.todos.createMany({
    data: [
      { description: 'Clean the shoes', complete: true },
      { description: 'Do the house shores' },
      { description: 'Organize the clothes' },
      { description: 'Take out the trash' },
      { description: 'Code a lot', complete: true },
      { description: 'Talk to my girlfriend', complete: true },
    ],
  });

  return NextResponse.json({ message: 'Seed executed' });
}
