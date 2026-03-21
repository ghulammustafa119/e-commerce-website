import {
  Cinzel,
  Montserrat,
  Playfair_Display,
  Prata,
  Bodoni_Moda,
} from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"] });
const prata = Prata({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Fonts() {
  return (
    <div className="bg-black w-full h-auto py-5 sm:py-0 sm:h-[80px] md:h-[122px] flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-evenly gap-x-8 sm:gap-x-5 gap-y-3 px-6 sm:px-10 md:px-24 max-w-screen-2xl mx-auto">
      <h1 className={`${playfair.className} text-base sm:text-lg md:text-[32px] text-white font-bold`}>
        Versace
      </h1>
      <h1 className={`${bodoni.className} text-base sm:text-lg md:text-[32px] text-white font-bold`}>
        Zara
      </h1>
      <h1 className={`${cinzel.className} text-base sm:text-lg md:text-[32px] text-white font-bold`}>
        Gucci
      </h1>
      <h1 className={`${prata.className} text-base sm:text-lg md:text-[36px] text-white font-extrabold`}>
        Prada
      </h1>
      <h1 className={`${montserrat.className} text-base sm:text-lg md:text-[32px] text-white whitespace-nowrap`}>
        Calvin Klein
      </h1>
    </div>
  );
}
