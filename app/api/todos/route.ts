import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ZodErrorResponse } from '../interfaces/zod';
import { todoSchemaPOST } from '../schemas/zod.schemas';
import { handleError } from '../utils/errorHandler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(take) || take < 0) {
    return NextResponse.json(
      { message: 'Param take must be a number greater than 0' },
      { status: 400 }
    );
  }

  if (isNaN(skip) || skip < 0) {
    return NextResponse.json(
      { message: 'Param skip must be a number  greater than 0' },
      { status: 400 }
    );
  }

  const todos = await prisma.todos.findMany({
    take,
    skip,
  });

  return NextResponse.json({ message: 'Todos', todos });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedTodo = todoSchemaPOST.parse(body);
    const todo = await prisma.todos.create({ data: validatedTodo });

    return NextResponse.json(todo);
  } catch (error) {
    const { zodErr } = handleError(error as ZodErrorResponse);
    return NextResponse.json({ error: zodErr }, { status: 400 });
  }
}

export const DELETE = async (request: Request) => {
  try {
    const todos = await prisma.todos.deleteMany({ where: { complete: true } });

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(error);
  }
};
