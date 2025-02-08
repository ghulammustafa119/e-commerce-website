import { AccordionDemo } from '@/components/accordion';
import { BreadcrumbDemo } from '@/components/bredcrumb';
import { CheckboxDisabled } from '@/components/check-box';
import { DressStyle } from '@/components/dressStyle';
import PaginationPage from '@/components/pagination';
import Shirts from '@/components/shirts';
import Size from '@/components/size';
import { SliderDemo } from '@/components/slider';
import React from 'react';

const Onsale = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-6 space-y-4 lg:space-y-0 px-4 sm:px-6 lg:px-8">
      {/* Left Sidebar */}
      <div className="w-full sm:w-[300px]">
        <BreadcrumbDemo/>
        <AccordionDemo />
        <SliderDemo />
        <CheckboxDisabled />
        <Size />
        <DressStyle />
      </div>
      {/* Main Content */}
      <div className="w-full lg:w-[900px]">
        <Shirts />
        <PaginationPage/>
      </div>
    </div>
    
  );
};

export default Onsale;