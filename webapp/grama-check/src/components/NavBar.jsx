import React from 'react'
import { useAuthContext } from '@asgardeo/auth-react';
import Logo from '../assets/logo.svg'
import { IoLogOut } from "react-icons/io5";


export default function NavBar() {
  const {signOut} = useAuthContext();

  return (
    <div className='bg-slate-200 top-0 flex flex-row justify-between px-4 py-2'>
        <img src={Logo} alt='login' className=' ml-4 w-[15%] h-[15%] my-auto'/>
        <div className='flex flex-row my-auto'>
        <h1 className='text-gray-500 text-s font-medium p-2 hover:cursor-pointer' onClick={()=> signOut()}>logout</h1>
        <IoLogOut className='text-gray-500 text-2xl font-medium mr-4 my-auto hover:cursor-pointer'/>
        </div>
    </div>
  )
}
