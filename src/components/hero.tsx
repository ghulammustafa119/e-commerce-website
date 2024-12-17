
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-[1440px] h-auto md:h-[500px] flex flex-col items-center bg-[#f2f0f1] md:flex-row md:justify-between mx-5 md:mx-20">
        {/* Left Content */}
        <div className="w-1/2 ">
          <h1 className="text-[22px] font-bold leading-snug md:text-5xl md:leading-tight">
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h1>
          <p className="text-sm mt-3 leading-relaxed md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="bg-black text-white text-sm px-6 py-2 mt-4 rounded-lg md:rounded-[16px]">
            Shop Now
          </button>
        </div>

        {/* Right Content - Images */}
        <div className="w-full relative flex justify-center mt-8 md:w-1/2 md:mt-0">
          {/* Main Image */}
          <Image
            src={"/images/gm.png"}
            alt="hero"
            width={500}
            height={300}
            className="w-[250px] md:w-[500px]"
          />

          {/* Decorative Star 1 */}
          <Image
            src={"/images/v13.png"}
            alt="star"
            width={50}
            height={50}
            className="absolute w-[30px] top-2 right-10 md:w-[50px] md:top-10 md:right-28"
          />

          {/* Decorative Star 2 */}
          <Image
            src={"/images/v13.png"}
            alt="star"
            width={30}
            height={30}
            className="absolute w-[20px] top-16 left-20 md:w-[30px] md:top-40 md:left-[300px]"
          />
        </div>
      </div>

      {/* Brands Section */}
      <div className="bg-black text-white w-full py-4 mt-10">
        <ul className="text-lg uppercase flex flex-col items-center gap-4 md:flex-row md:justify-evenly md:text-2xl md:py-4">
          <li>versace</li>
          <li>zara</li>
          <li>gucci</li>
          <li>prada</li>
          <li>calvin klein</li>
        </ul>
      </div>
    </>
  );
};

export default Hero;
