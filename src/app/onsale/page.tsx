// import { AccordionDemo } from '@/components/accordion'
// import { CheckboxDisabled } from '@/components/check-box'
// import { Dress } from '@/components/dress'
// import Shirts from '@/components/shirts'
// import Size from '@/components/size'
// import { SliderDemo } from '@/components/slider'
// import React from 'react'

// const Onsale = () => {
//   return (
//     <div className='flex justify-center items-center space-x-6'>
//         <div className='w-[295px] h-[1200px]'>
//              <AccordionDemo/>
//              <SliderDemo/>
//              <CheckboxDisabled/>
//              <Size/>
//              <Dress/>
//         </div>
//         <div className='w-[900px] h-[1220px]'>
//               <Shirts/>
//         </div>
//     </div>
//   )
// }

// export default Onsale



import { AccordionDemo } from '@/components/accordion';
import { CheckboxDisabled } from '@/components/check-box';
import { Dress } from '@/components/dress';
import Shirts from '@/components/shirts';
import Size from '@/components/size';
import { SliderDemo } from '@/components/slider';
import React from 'react';

const Onsale = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-6 space-y-4 lg:space-y-0 px-4 sm:px-6 lg:px-8">
      {/* Left Sidebar */}
      <div className="w-full sm:w-[300px]">
        <AccordionDemo />
        <SliderDemo />
        <CheckboxDisabled />
        <Size />
        <Dress />
      </div>
      {/* Main Content */}
      <div className="w-full lg:w-[900px]">
        <Shirts />
      </div>
    </div>
  );
};

export default Onsale;
