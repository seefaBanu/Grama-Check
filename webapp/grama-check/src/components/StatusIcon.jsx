import { FaCheck } from 'react-icons/fa';

export default function StatusIcon({done,status}) {
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
        sm:w-8 sm:h-8 
        md:w-10 md:h-10 
        xl:w-12 xl:h-12 
        w-14 h-14 
        rounded-full 
        ${done ? ' bg-[#5567d5]' : 'bg-[#9E9E9E]'}`}
      >
        {done && <FaCheck className="text-white my-3 mx-auto 
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
      md:text-md
      xl:text-lg
      text-xl 
      font-serif 
      text-[#555555]`}
    >
      {status}
    </p>
    </div>
  </div>
  )
}
