import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-auto max-w-screen-2xl mx-auto flex flex-col items-start bg-[#f2f0f1] md:flex-row md:justify-center md:px-20">
        {/* Left Content */}
        <div className="w-full md:w-[596px] text-center md:text-left md:mt-10 px-4 md:px-0">
          <h1 className="font-integralcf text-[28px] sm:text-4xl font-extrabold leading-snug md:text-[64px] md:leading-[64px] md:w-[577px] md:mt-[88px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-sm mt-3 leading-relaxed md:text-base text-black/60 max-w-[545px]">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link href="/onsale">
            <button className="bg-black text-white text-sm px-14 py-3.5 mt-6 w-full rounded-full md:text-base md:w-[210px] md:mt-4">
              Shop Now
            </button>
          </Link>
          {/* Stats - mobile only */}
          <div className="flex justify-evenly md:hidden flex-wrap gap-y-4 mt-6 space-x-2 sm:space-x-4">
            <div className="border-r pr-4">
              <h2 className="text-2xl font-bold">200+</h2>
              <p className="text-xs text-black/60">International Brands</p>
            </div>
            <div className="border-r pr-4">
              <h2 className="text-2xl font-bold">2,000+</h2>
              <p className="text-xs text-black/60">High-Quality Products</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">30,000+</h2>
              <p className="text-xs text-black/60">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Content - Images */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
          <Image
            src="/images/couple.jpeg"
            alt="Couple wearing stylish clothes from Shop.co"
            width={617}
            height={300}
            className="max-w-full h-auto"
            priority
          />
          <Image
            src="/images/star.png"
            alt=""
            width={104}
            height={104}
            className="absolute w-[76px] h-[76px] top-[53px] right-[26px] md:w-[104px] md:h-[104px] md:top-[15%] md:right-[8%]"
          />
          <Image
            src="/images/star.png"
            alt=""
            width={56}
            height={56}
            className="absolute w-11 h-11 top-[141px] left-[26px] md:w-14 md:h-14 md:top-[55%] md:left-[8%]"
          />
        </div>
      </div>



    </>
  );
};

export default Hero;
