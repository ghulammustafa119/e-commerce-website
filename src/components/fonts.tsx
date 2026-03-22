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
    <div className="bg-black w-full h-auto py-5 lg:py-0 lg:h-[122px] flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-evenly gap-x-6 lg:gap-x-5 gap-y-3 px-4 sm:px-10 lg:px-24 max-w-screen-2xl mx-auto">
      <h1 className={`${playfair.className} text-xl lg:text-[32px] text-white font-bold`}>
        Versace
      </h1>
      <h1 className={`${bodoni.className} text-xl lg:text-[32px] text-white font-bold`}>
        Zara
      </h1>
      <h1 className={`${cinzel.className} text-xl lg:text-[32px] text-white font-bold`}>
        Gucci
      </h1>
      <h1 className={`${prata.className} text-xl lg:text-[36px] text-white font-extrabold`}>
        Prada
      </h1>
      <h1 className={`${montserrat.className} text-xl lg:text-[32px] text-white whitespace-nowrap`}>
        Calvin Klein
      </h1>
    </div>
  );
}
