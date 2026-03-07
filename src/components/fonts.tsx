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
    <div className="bg-black w-full h-auto py-4 sm:py-6 md:py-8 flex flex-wrap justify-center sm:justify-evenly md:justify-between px-4 sm:px-8 text-center gap-3 sm:gap-4 max-w-screen-2xl mx-auto">
      <h1
        className={`${playfair.className} text-xl sm:text-xl sm:text-2xl md:text-4xl text-white font-bold`}
      >
        Versace{" "}
      </h1>
      <h1
        className={`${bodoni.className} text-xl sm:text-2xl md:text-4xl text-white font-bold`}
      >
        Zara
      </h1>

      <h1
        className={`${cinzel.className} text-xl sm:text-2xl md:text-4xl text-white font-bold`}
      >
        Gucci
      </h1>
      <h1
        className={`${prata.className} text-xl sm:text-2xl md:text-4xl  text-white font-extrabold`}
      >
        Prada
      </h1>
      <h1
        className={`${montserrat.className} text-xl sm:text-2xl md:text-4xl text-white `}
      >
        Calvin Klein
      </h1>
    </div>
  );
}
