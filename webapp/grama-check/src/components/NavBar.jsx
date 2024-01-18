import React from 'react'
import { useAuthContext } from '@asgardeo/auth-react';

export default function NavBar() {
  const {signOut} = useAuthContext();

  return (
    <div className='bg-gray-500 top-0 h-15 flex flex-row justify-between px-4'>
        <h1 className='text-black text-lg font-medium p-2'>Grama Check</h1>
        <h1 className='text-white text-lg font-medium p-2 ' onClick={()=> signOut()}>logout</h1>
    </div>
  )
}
