export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import React from 'react';

export const metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};

const ServerTodosPage = async () => {
  const todos = await prisma.todos.findMany({
    orderBy: { description: 'asc' },
  });

  console.log('Construido')

  return (
    <div>
      <span className="text-3xl mb-10">Server actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
};

export default ServerTodosPage;
