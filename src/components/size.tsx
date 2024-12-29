import React from 'react'

const Size = () => {
  return (
    <div className='px-6'>
         <h2 className="text-xl font-bold text-black mt-7 mb-3">Size</h2>
          <div className="flex flex-wrap mt-2 space-x-5 gap-3 mb-4">
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              Small
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              X-Small
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              XX-Small
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              Medium
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              Large
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              X-Large
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              XX-Large
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              3-Large
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              4-Large
            </button>
          </div>
    </div>
  )
}

export default Size