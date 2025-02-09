// Import Google Fonts
import {
  Cinzel,
  Montserrat,
  Playfair_Display,
  Prata,
  Bodoni_Moda,
} from "next/font/google";

// Load Fonts
const playfair = Playfair_Display({ subsets: ["latin"] });
const cinzel = Cinzel({ subsets: ["latin"] });
const bodoni = Bodoni_Moda({ subsets: ["latin"] });
const prata = Prata({
  subsets: ["latin"],
  weight: "400",
});
const montserrat = Montserrat({ subsets: ["latin"] });

export default function Fonts() {
  return (
    <div className=" bg-black w-full h-[100px] md:h-[90px] flex flex-wrap justify-evenly md:justify-between   p-8 text-center space-x-3  max-w-screen-2xl mx-auto">
      <h1
        className={`${playfair.className} text-2xl  md:text-4xl text-white font-bold`}
      >
        Versace{" "}
      </h1>
      <h1
        className={`${bodoni.className} text-2xl md:text-4xl text-white font-bold`}
      >
        Zara
      </h1>

      <h1
        className={`${cinzel.className} text-2xl md:text-4xl text-white font-bold`}
      >
        Gucci
      </h1>
      <h1
        className={`${prata.className} text-2xl md:text-4xl  text-white font-extrabold`}
      >
        Prada
      </h1>
      <h1
        className={`${montserrat.className} text-2xl md:text-4xl text-white `}
      >
        Calvin Klein
      </h1>
    </div>
  );
}
