import Hero from "@/components/hero";
import Products from "./products/page";
import Fonts from "@/components/fonts";
import Customers from "@/components/customer";
import Dress from "@/components/dress";
import Sell from "./products/sell";




export default function Home() {

  return (
   <div>
         <Hero />
         <Fonts/>
         <Products />
         <Sell/>
         <Dress/>
         <Customers/>
   </div>
  );
}
