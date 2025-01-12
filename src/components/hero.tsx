
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-auto max-w-screen-2xl mx-auto md:h-[663px] flex flex-col items-start bg-[#f2f0f1] md:flex-row md:justify-center md:px-20">
        {/* Left Content */}
        <div className="w-full md:w-[596px] text-center md:text-left md:mt-10">
          <h1 className="text-[22px] font-bold leading-snug md:text-5xl md:leading-tight md:w-[468px] md:mt-[88px]">
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h1>
          <p className="text-sm mt-3 leading-relaxed md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="bg-black text-white text-sm px-6 py-2 mt-6 w-full rounded-lg md:rounded-[16px] md:text-base md:w-[148px] md:mt-3">
            Shop Now
          </button>
          <div className=" flex justify-evenly md:hidden md:justify-between flex-wrap md:flex-nowrap gap-y-4 mt-4 ml-4 space-x-4">
                  <div className="border-r pr-2">
                    <h1 className="text-2xl md:text-5xl  ">200+</h1>
                    <p className="text-xs md:text-[15px] text-gray-500">International Brands</p>
                  </div>
                  <div className="border-r pr-5">
                    <h1 className="text-2xl md:text-5xl  ">2,000+</h1>
                    <p className="text-xs md:text-[15px] text-gray-500">High-Quality Products</p>
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-5xl ">30,000+</h1>
                    <p className="text-xs md:text-[15px] text-gray-500">Happy Customers</p>
                  </div>
               </div>
        </div>

        {/* Right Content - Images */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
          {/* Main Image */}
          <Image
            src="/images/couple.jpeg"
            alt="hero"
            width={617}
            height={300}
            className="max-w-full h-auto"
            priority
          />

          {/* Decorative Star 1 */}
          <Image
            src="/images/v13.png"
            alt="decorative star"
            width={76}
            height={76}
            className="absolute w-[76px] h-[76px] top-[53px] right-[26px] md:w-[104px] md:h-[104px] md:top-[117px] md:right-[65px]"
          />

          {/* Decorative Star 2 */}
          <Image
            src="/images/v13.png"
            alt="decorative star"
            width={44}
            height={44}
            className="absolute w-11 h-11 top-[141px] left-[26px] md:w-14 md:h-14 md:top-80 md:left-[65px]"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
