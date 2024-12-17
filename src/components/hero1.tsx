import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

interface IProduct {
  title: string;
  price: string;
  id: number;
  rating?: string;
  old_price?: string;
  img_url: string;
  discount?:string
}

let product: IProduct[] = [
  {
    title: "T-SHIRT WITH TAPE DETAILS",
    id: 1,
    price: "$120",
    img_url: "/images/four.png",
  },
  {
    title: "SKINNY FIT JEANS",
    id: 2,
    price: "$240",
    old_price:"$260",
    discount: "-20%",
    img_url: "/images/one.png",
  },
  {
    title: "CHECKERED SHIRT",
    id: 3,
    price: "$180",
    img_url: "/images/two.png",
  },
  {
    title: "SLEEVE STRIPED T-SHIRT",
    id: 4,
    price: "$130",
    old_price:"$160",
    discount:"-30%",
    img_url: "/images/three.png",
  },
];

let star = [
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
];
const Hero1 = () => {
  return (
    <div className="max-w-[1440px] h-auto mx-5 md:mx-20">
      <h1 className="text-2xl mb-4 sm:text-4xl mt-4 text-center md:top-4 md:mb-4 font-bold md:font-semibold">NEW ARRIVALS</h1>
      <div className="flex flex-col md:flex-row justify-between items-center">
        {product.map((item, index) => (
          <div key={index}>
            <Image
              src={item.img_url}
              alt={item.title}
              width={270}
              height={298}
              className="mb-6 mt-4 "
            ></Image>
            <div>
              <p className="text-lg font-bold leading-tight">{item.title}</p>
              <p className="flex text-yellow-400">{star}</p>
              <p className="font-bold">{item.price} <span className="text-gray-400 line-through">{item.old_price}</span> <span className="w-[58px] h-7 bg-[#ff3333] opacity-10 text-[#ff3333] md:text-[12px] rounded-2xl text-sm">{item.discount}</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[218px] h-[52px] text-center m-auto pt-3">
        <button>View All</button>
      </div>
    </div>
  );
};

export default Hero1;
