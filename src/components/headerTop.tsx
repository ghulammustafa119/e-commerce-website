import React from 'react'
import { LiaTimesSolid } from "react-icons/lia";

const HeaderTop = () => {
  return (
    <>
       <main className='h-[38px] max-w-screen-2xl mx-auto bg-black text-white flex justify-center items-center px-4 max-w-screen-2xl mx-auto relative'>
        <div className='flex justify-center items-center'>
            <h3 className='text-[10px] sm:text-sm text-center font-normal md:ml-28'>Sign up and get 20% off to your first order. </h3>
            <button className='tex-[10px] sm:font-normal md:font-semibold underline cursor-pointer ml-2'>Sign Up Now</button>
            <LiaTimesSolid className=' font-bold text-lg absolute right-20 hidden sm:block'/>
        </div>
       </main>
    </>
  )
}

export default HeaderTop