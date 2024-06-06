'use server';

import prisma from '@/lib/prisma';
import { todos } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const sleep = async (seconds = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
    //   if (true) reject(false);
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<todos> => {
  await sleep(3);

  const todo = await prisma.todos.findFirst({ where: { id } });

  if (!todo) throw `Todo with the id ${id} not found`;

  const updatedTodo = await prisma.todos.update({
    where: { id },
    data: { complete },
  });

  revalidatePath('/dashboard/server-todos');
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todos.create({ data: { description } });

    revalidatePath('/dashboard/server-todos');
    return todo;
  } catch (error) {
    return {
      message: 'error creating todo',
    };
  }
};

export const deleteTodo = async () => {
  try {
    const todos = await prisma.todos.deleteMany({ where: { complete: true } });

    revalidatePath('/dashboard/server-todos');
    return todos;
  } catch (error) {
    return {
      message: 'error creating todo',
    };
  }
};
