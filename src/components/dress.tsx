import Image from "next/image";
import Link from "next/link";

export default function Dress() {
  return (
    <div className="w-full flex justify-center items-center mt-16 mb-4 max-w-screen-xl mx-auto px-4">
      <div className="w-full bg-[#F0F0F0] rounded-[20px] md:rounded-[40px] px-4 sm:px-6 md:px-16 py-8 md:py-16">
        <h1 className="font-integralcf text-2xl md:text-[48px] font-bold text-center">
          BROWSE BY DRESS STYLE
        </h1>
        {/* Row 1: Casual (small) + Formal (large) */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 md:mt-12">
          <Link href="/onsale?dressStyle=casual" className="relative bg-white w-full md:w-[36%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              Casual
            </h2>
            <Image
              src="/images/casual .png"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={407}
              height={289}
              alt="Casual style clothing"
            />
          </Link>
          <Link href="/onsale?dressStyle=formal" className="relative bg-white w-full md:w-[64%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              Formal
            </h2>
            <Image
              src="/images/formal.png"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={684}
              height={289}
              alt="Formal style clothing"
            />
          </Link>
        </div>
        {/* Row 2: Party (large) + Gym (small) */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Link href="/onsale?dressStyle=party" className="relative bg-white w-full md:w-[64%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              Party
            </h2>
            <Image
              src="/images/party.png"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={684}
              height={289}
              alt="Party style clothing"
            />
          </Link>
          <Link href="/onsale?dressStyle=gym" className="relative bg-white w-full md:w-[36%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              Gym
            </h2>
            <Image
              src="/images/gym.png"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={407}
              height={289}
              alt="Gym style clothing"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
