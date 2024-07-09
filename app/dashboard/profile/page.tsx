'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const ProfilePage = () => {

    const { data: sesion } = useSession();

  useEffect(() => {
    console.log('Client profile');
  }, []);

  return (<div>
    <h1>Page Profile</h1>
    <hr />

    <div className='flex flex-col'>
        <span>{sesion?.user?.name ?? 'No Name'}</span>
        <span>{sesion?.user?.email ?? 'No Email'}</span>
        <span>{sesion?.user?.image ?? 'No Image'}</span>
        <span>{sesion?.user?.roles?.join(',') ?? 'No Image'}</span>
    </div>
  </div>);
};

export default ProfilePage;
