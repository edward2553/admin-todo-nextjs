import { TabBar } from '@/components';
import { cookies } from 'next/headers';
import React from 'react'




export const metadata = {
 title: 'Cookies Page',
 description: 'Cookies Page',
};

const CookiesPage = () => {

  const cookieStore = cookies();
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col w-full ">
        {JSON.stringify(cookieTab)}
        <span className='text-3xl'>Tabs</span>
        <TabBar currentTab={Number(cookieTab)} />
      </div>
    </div>
  )
}

export default CookiesPage