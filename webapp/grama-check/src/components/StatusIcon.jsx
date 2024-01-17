import { useState,useEffect } from 'react';
import { FaCheck,FaTimes } from 'react-icons/fa';

export default function StatusIcon({text,status}) {
  const [statusColor,setStatusColor]=useState();

  useEffect(() => {
    if (status?.toLowerCase() === 'done') {
      setStatusColor('bg-green-400');
    } else if (status?.toLowerCase() === 'rejected') {
      setStatusColor('bg-red-400');
    } 
    else if(status?.toLowerCase() === 'pending'){
      setStatusColor('bg-gray-400');
    }
    else{
      setStatusColor('bg-gray-400');
    }
  }, [status]);

  return (
    <div className="flex items-center">
    <div className="relative 
    sm:w-12 sm:h-12 
    md:w-16 md:h-16 
    xl:w-18 xl:h-18
    w-20 h-20 
    flex items-center justify-center ">
      <div
        className={`
        rounded-3xl 
        sm:w-8 sm:h-8 
        md:w-10 md:h-10 
        xl:w-12 xl:h-12 
        w-14 h-14 
        
         ${statusColor}`}
      >
        {status?.toLowerCase()==='done' && <FaCheck className="text-white my-3 mx-auto 
        sm:text-md
        sm:my-2
        md:text-xl
        xl:text-2xl
        text-3xl"/>}
        {status?.toLowerCase()==='rejected' && <FaTimes className="text-white my-3 mx-auto 
        sm:text-md
        sm:my-2
        md:text-xl
        xl:text-2xl
        text-3xl"/>}
      </div>
    </div>
    <div className="ml-2">
    <p
      className={`
      sm:text-sm
      md:text-sm
      xl:text-base
      text-lg
      text-[#555555]`}
    >
      {text}
    </p>
    </div>
  </div>
  )
}
