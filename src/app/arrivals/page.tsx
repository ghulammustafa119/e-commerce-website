
// "use client";
// import { Button } from "@/components/ui/button";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";
// import { useState, useEffect } from "react";
// import{IProduct} from "@/components/types"


// const star = Array(5).fill(<FaStar className="text-yellow-400" />);

// export default function Sell() {

//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const fetchedProducts: IProduct[] = await client.fetch(
//           `*[_type == 'product']{
//             "imageUrl": image.asset->url,
//             category,
//             discountPercent,
//             isNew,
//             name,
//             description,
//             price,
//             _id
//           }[0...4]`
//         );

//         setProducts(fetchedProducts);
//       } catch (err) {
//         setError("Failed to load products. Please try again later.");
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-medium">Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 font-bold">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-screen-2xl mx-auto h-auto px-4 sm:px-6 md:px-20">
//       <h1 className="text-xl sm:text-2xl md:text-4xl mt-4 mb-4 text-center font-bold">Top Selling</h1>
//       <div className="relative mt-10 flex space-x-2 px-2 overflow-x-auto">
//         {products.map((product) => {
//           const originalPrice = product.price / (1 - product.discountPercent / 100);
//           const discountAmount = originalPrice - product.price;

//           return (
//             <div key={product._id}>
//               <Link href={`/product/${product._id}`}>
//                 <div className="w-[200px] md:w-[270px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px] overflow-hidden mx-auto">
//                   {product.imageUrl ? (
//                     <Image
//                       src={urlFor(product.imageUrl).url()}
//                       alt={product.name}
//                       width={270}
//                       height={298}
//                       className="w-full rounded-lg shadow-md hover:scale-125 transition-transform duration-500 object-cover h-full"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex justify-center items-center bg-gray-300">
//                       <p className="text-gray-600 uppercase">some thing wrong</p>
//                     </div>
//                   )}
//                 </div>
//               </Link>
//               <div className="pl-2 mt-2">
//                 <p className="text-lg font-bold">{product.name}</p>
//                 <div className="flex">{star}</div>
//                 <p className="font-bold mt-1">
//                   ${product.price.toFixed(2)} {/* Discounted Price */}
//                   {product.discountPercent > 0 && (
//                     <>
//                       <span className="text-gray-400 font-bold line-through ml-2">
//                         ${originalPrice.toFixed(2)} {/* Original Price */}
//                       </span>
//                       <span className="text-green-600 ml-2">
//                         (Save ${discountAmount.toFixed(2)}) {/* Discount Amount */}
//                       </span>
//                     </>
//                   )}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex justify-center mt-5">
//         <Link href="/onsale">
//           <Button variant="outline" className="w-[80%] sm:w-[200px] rounded-[20px]">
//             View all
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }








// import { BreadcrumbDemo } from "@/components/bredcrumb"
// import { Button } from "@/components/ui/button"
// import { Delete, Minus, Plus } from "lucide-react"
// import Image from "next/image"


// interface Icart {
//     imageurl:string,
//     title:string,
//     id:number
//     size:string,
//     color:string,
//     price:string,
// }
// const cartItem:Icart[] = [
//     {
//      imageurl:"/images/pro1.png",
//     title:"Gradient Graphic T-shirt",
//     id:1,
//     size:"large",
//     color:"white",
//     price:"$120",
//     },
//     {
//      imageurl:"/images/pro2.png",
//     title:"Gradient Graphic T-shirt",
//     id:2,
//     size:"large",
//     color:"white",
//     price:"$120",
//     },
//     {
//      imageurl:"/images/pro3.png",
//     title:"Gradient Graphic T-shirt",
//     id:3,
//     size:"large",
//     color:"white",
//     price:"$120",
//     }
// ]

// export default function Cart(){
//     return(
//         <>
//            <div className=" pl-5">
//            <BreadcrumbDemo/>
//            <h1 className="text-2xl font-bold mt-2">Your cart</h1>
//            </div>
//         <div className="flex flex-col md:flex-row justify-center items-start gap-3 mt-6">
            
//               {/* left div */}
//                  <div className="w-full h-full md:w-[700px] md:h-[500px] border rounded-[20px]">
//                        {
//                         cartItem.map((item)=>{
//                             return(
//                                 <div className="flex justify-between  mt-4 p-4 border-b" key={item.id}>
//                                    <div className="flex gap-3">
//                                    <Image src={item.imageurl} alt={item.title} className="rounded-[16px]" width={100} height={100}></Image>
//                                       <div>    
//                                           <h3 className="font-bold">{item.title}</h3>
//                                           <p className="text-sm">Size:{item.size}</p>
//                                           <p className="text-sm">Color:{item.color}</p>
//                                           <p className="font-bold">{item.price}</p>
//                                       </div>
//                                    </div>
//                                               {/* right side */}
//                                              <div className="flex flex-col justify-between items-center space-y-5">
//                                              <Delete/>
//                                               <div className="w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400 ">
//                                                    <Minus/>
//                                                    1
//                                                    <Plus/>
//                                                </div>
//                                              </div>
//                                 </div>
//                             )
//                         })
//                        }
//                  </div>
//               {/* right div */}
//               <div className="w-full md:w-[400px] h-full md:h-[450px] border rounded-[20px]  flex flex-col justify-start items-center p-4">
//                    <div className="w-[90%] space-y-2">
//                    <h1 className="text-xl font-bold">Order Summary</h1>
//                     <p className="flex justify-between">Subtotal <span>$500</span> </p>
//                     <p className="flex justify-between">Subtotal <span>$100</span> </p>
//                     <p className="flex justify-between">Subtotal <span>$100</span> </p>
//                     <p className="flex justify-between">Total <span>$700</span> </p>
//                    <div className="flex">
//                    <input className="bg-[#F0F0F0] w-[200px] md:w-full py-2 px-5 rounded-[16px] text-gray-600 outline-none" placeholder="Add promo code" />
//                    <Button className="ml-1">Apply</Button>
//                    </div>
//                     <Button className="w-full">Go To Checkout</Button>
                    
//                    </div>
//               </div>
//         </div>
//         </>
//     )
// }





"use client"

import { BreadcrumbDemo } from "@/components/bredcrumb";
import { Button } from "@/components/ui/button";
import { Delete, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Icart {
  imageurl: string;
  title: string;
  id: number;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

const initialCart: Icart[] = [
  {
    imageurl: "/images/pro1.png",
    title: "Gradient Graphic T-shirt",
    id: 1,
    size: "Large",
    color: "White",
    price: 120,
    quantity: 1,
  },
  {
    imageurl: "/images/pro2.png",
    title: "Gradient Graphic T-shirt",
    id: 2,
    size: "Large",
    color: "White",
    price: 120,
    quantity: 1,
  },
  {
    imageurl: "/images/pro3.png",
    title: "Gradient Graphic T-shirt",
    id: 3,
    size: "Large",
    color: "White",
    price: 120,
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<Icart[]>(initialCart);
  const [promoCode, setPromoCode] = useState("");
  
  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <>
      <div className="pl-5">
        <BreadcrumbDemo />
        <h1 className="text-2xl font-bold mt-2">Your cart</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-3 mt-6">
        {/* Left Section */}
        <div className="w-full h-full md:w-[700px] md:h-[500px] border rounded-[20px]">
          {cartItems.map((item) => (
            <div className="flex justify-between mt-4 p-4 border-b" key={item.id}>
              <div className="flex gap-3">
                <Image src={item.imageurl} alt={item.title} className="rounded-[16px]" width={100} height={100} />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm">Size: {item.size}</p>
                  <p className="text-sm">Color: {item.color}</p>
                  <p className="font-bold">${item.price * item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center space-y-5">
                <Delete className="cursor-pointer" onClick={() => handleRemoveItem(item.id)} />
                <div className="w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400">
                  <Minus className="cursor-pointer" onClick={() => handleQuantityChange(item.id, -1)} />
                  {item.quantity}
                  <Plus className="cursor-pointer" onClick={() => handleQuantityChange(item.id, 1)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[400px] h-full md:h-[450px] border rounded-[20px] flex flex-col justify-start items-center p-4">
          <div className="w-[90%] space-y-2">
            <h1 className="text-xl font-bold">Order Summary</h1>
            <p className="flex justify-between">Subtotal <span>${subtotal.toFixed(2)}</span></p>
            <p className="flex justify-between">Discount <span>${discount.toFixed(2)}</span></p>
            <p className="flex justify-between font-bold">Total <span>${total.toFixed(2)}</span></p>
            <div className="flex">
              <input 
                className="bg-[#F0F0F0] w-[200px] md:w-full py-2 px-5 rounded-[16px] text-gray-600 outline-none" 
                placeholder="Add promo code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button className="ml-1" onClick={() => setPromoCode(promoCode)}>Apply</Button>
            </div>
            <Button className="w-full">Go To Checkout</Button>
          </div>
        </div>
      </div>
    </>
  );
}
