import { WidgetItem } from '@/components';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if(!session) redirect('/api/auth/signin')

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado">
        <p className='w-full overflow-auto'>
          {JSON.stringify(session)}
        </p>
      </WidgetItem>
    </div>
  );
}
