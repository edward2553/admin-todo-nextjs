import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  await prisma.todos.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'test1@gmail.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super_user'],
      todos: {
        create: [
          { description: 'Clean the shoes', complete: true },
          { description: 'Read a lot' },
          { description: 'Code a lot' },
          { description: 'Having a good life and drinking water' },
          { description: 'Enjoy Life and relax', complete: true },
          { description: 'Kamehameha', complete: true },
        ],
      }
    }
  });

  // await prisma.todos.createMany({
  //   data: [
  //     { description: 'Clean the shoes', complete: true },
  //     { description: 'Do the house shores' },
  //     { description: 'Organize the clothes' },
  //     { description: 'Take out the trash' },
  //     { description: 'Code a lot', complete: true },
  //     { description: 'Talk to my girlfriend', complete: true },
  //   ],
  // });

  return NextResponse.json({ message: 'Seed executed' });
}
