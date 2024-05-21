import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { todoSchemaPUT } from '../../schemas/zod.schemas';
import { handleError } from '../../utils/errorHandler';
import { ZodErrorResponse } from '../../interfaces/zod';

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const todoID = params.id;

  const todo = await prisma.todos.findFirst({ where: { id: todoID } });

  if (!todo)
    return NextResponse.json(
      { message: 'Could not find the todo' },
      { status: 404 }
    );

  return NextResponse.json({ message: 'Success', todo });
}

export async function PUT(request: Request, { params }: Segments) {
  try {
    const { id } = params;
    const body = await request.json();

    const todo = await prisma.todos.findFirst({ where: { id } });

    if (!todo) {
      return NextResponse.json(
        { message: `Todo with id ${id} is not found` },
        { status: 404 }
      );
    }

    todoSchemaPUT.parse(body);

    const { complete, description } = body;

    const updatedTodo = await prisma.todos.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    const { zodErr } = handleError(error as ZodErrorResponse);
    return NextResponse.json({ error: zodErr }, { status: 400 });
  }
}
