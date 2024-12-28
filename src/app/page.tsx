import Hero from "@/components/hero";
import Hero1 from "@/components/hero1";
import Products from "./products/page";
import { CarouselDemo } from "@/components/carousel";




export default function Home() {
  return (
   <div>
         <Hero/>
         <Hero1/>
         <Products/>
         <CarouselDemo/>
   </div>
  );
}
