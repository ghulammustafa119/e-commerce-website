import Hero from "@/components/hero";
import Hero1 from "@/components/hero1";
import Products from "./products/page";
import { CarouselDemo } from "@/components/carousel";
import Fonts from "@/components/fonts";




export default function Home() {
  return (
   <div>
         <Hero/>
         <Fonts/>
         <Hero1/>
         <Products/>
         <CarouselDemo/>
   </div>
  );
}
