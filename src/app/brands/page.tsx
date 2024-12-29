
import { ICart } from "@/components/types";
import React from "react";
import Image from "next/image";
import { Delete, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbDemo } from "@/components/bredcrumb";

const cartItem: ICart[] = [
  {
    imageurl: "/images/Frame 33.png",
    title: "Gradient Graphic T-shirt",
    id: 1,
    size: "Large",
    color: "White",
    price: "$145",
  },
  {
    imageurl: "/images/two.png",
    title: "CHECKERED SHIRT",
    id: 2,
    size: "Medium",
    color: "Red",
    price: "$180",
  },
  {
    imageurl: "/images/one.png",
    title: "SKINNY FIT JEANS",
    id: 3,
    size: "Large",
    color: "Blue",
    price: "$240",
  },
];

const Brands = () => {
  return (
    <>
      <div className=" md:px-2">
        <BreadcrumbDemo />
        <h1 className="font-bold text-2xl md:text-4xl mt-4 ml-4 md:ml-10 uppercase">Your Cart</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start gap-6 mt-6 px-4 md:px-0">
        {/* Cart Items Section */}
        <div className="w-full md:w-[715px] bg-white border rounded-lg p-4 md:p-6 overflow-x-auto">
          {cartItem.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between items-center gap-4 border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.imageurl}
                  alt={item.title}
                  width={124}
                  height={124}
                  className="rounded"
                />
                <div>
                  <h3 className="font-bold text-sm md:text-lg">{item.title}</h3>
                  <p className="text-xs md:text-base">Size: {item.size}</p>
                  <p className="text-xs md:text-base">Color: {item.color}</p>
                  <p className="text-base md:text-2xl font-bold">{item.price}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-col justify-between items-center gap-10">
                <Delete className="cursor-pointer text-gray-500 hover:text-red-500" />
                <div className="flex justify-between items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                  <Minus className="cursor-pointer text-gray-500 hover:text-black" />
                  <span>1</span>
                  <Plus className="cursor-pointer text-gray-500 hover:text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:w-[505px] bg-white border rounded-lg p-4 md:p-6 flex flex-col">
          <h1 className="font-bold text-xl md:text-2xl">Order Summary</h1>

          <div className="mt-4 space-y-4">
            <p className="flex justify-between text-base md:text-lg text-gray-700">
              Subtotal <span className="text-black">$565</span>
            </p>
            <p className="flex justify-between text-base md:text-lg text-gray-700">
              Discount (-20%) <span className="hover:text-red-700 cursor-pointer text-black">-$113</span>
            </p>
            <p className="flex justify-between text-base md:text-lg text-gray-700">
              Delivery Fee <span className="text-black">$15</span>
            </p>
            <p className="flex justify-between text-base md:text-lg font-bold text-black">
              Total <span>$467</span>
            </p>
          </div>

          <div className="flex flex-row md:flex-row items-center gap-4 mt-6">
            <input
              className="w-[218px] h-12 md:w-[326px] flex-1 bg-[#f0f0f0] rounded-[62px] gap-3 px-4 py-3 text-sm md:text-base"
              type="text"
              placeholder="Add promo code"
            />
            <Button className="w-[88px] h-12 md:w-[119px] px-6 py-2 text-white bg-black rounded-[62px] gap-3">
              Apply
            </Button>
          </div>

          <Button className="mt-6 w-full h-[60px] px-[54px] py-4 gap-3 rounded-[62px] text-white bg-black">
            Go to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Brands;
