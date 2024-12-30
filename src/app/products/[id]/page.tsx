"use client";
import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import AllReviws from "@/components/rating-and-reviews";
import Fashion from "@/components/products";
import { BreadcrumbDemo } from "@/components/bredcrumb";

let star = [
  <AiFillStar key={1} />,
  <AiFillStar key={2} />,
  <AiFillStar key={3} />,
  <AiFillStar key={4} />,
  <AiFillStar key={5} />,
];

interface IProduct {
  title: string;
  price: string;
  id: number;
  rating?: string;
  old_price?: string;
  img_url: string;
  discount?: string;
  img1: string;
  img2: string;
  img3: string;
}

let product: IProduct[] = [
  {
    title: "ONE LIFE GRAPHIC T-SHIRT",
    id: 1,
    price: "$260",
    old_price: "$300",
    discount: "-40%",
    img_url: "/images/pic1.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
  {
    title: "VERTICAL STRIPED SHIRT",
    id: 2,
    price: "$145",
    img_url: "/images/pic2.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
  {
    title: "LOOSE FIT BERMUDA SHORTS",
    id: 3,
    price: "$80",
    img_url: "/images/pic3.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
  {
    title: "FADED SKINNY JEANS",
    id: 4,
    price: "$210",
    img_url: "/images/pic4.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
];

const Page = () => {
  const params = useParams();
  const id = params.id;
  const data = product.find((item) => item.id === Number(id));

  if (!data) {
    return <h1>Product not found</h1>;
  }

  return (
    <>
    <BreadcrumbDemo/>
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left Column: Thumbnails */}
        <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 mb-4 md:mb-0">
          <Image
            src={data.img1}
            alt="pic1"
            width={111}
            height={106}
            className="cursor-pointer md:w-[152px] md:h-[167px]"
          />
          <Image
            src={data.img2}
            alt="pic2"
            width={112}
            height={106}
            className="cursor-pointer md:w-[152px] md:h-[168px]"
          />
          <Image
            src={data.img3}
            alt="pic3"
            width={111}
            height={106}
            className="cursor-pointer md:w-[152px] md:h-[167px]"
          />
        </div>

        {/* Center Column: Main Image */}
        <div>
          <Image
            src={data.img1}
            alt="main-pic"
            width={358}
            height={290}
            className="rounded-lg md:w-[444px] md:h-[530px]"
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{data.title}</h1>
          <div className="flex text-yellow-400 mb-2">{star}</div>
          <p className="text-lg font-bold mb-2">
            {data.price}{" "}
            <span className="line-through text-gray-500">{data.old_price}</span>{" "}
            <span className="text-red-500">{data.discount}</span>
          </p>
          <p className="text-gray-600 mb-4">
            This graphic t-shirt is perfect for any occasion. Crafted from a
            soft and breathable fabric, it offers superior comfort and style.
          </p>
          <div className="border-b mb-4"></div>

          {/* Colors */}
          <p className="text-sm text-gray-500 mb-2">Select Colors</p>
          <div className="flex space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#534933] flex justify-center items-center cursor-pointer">
              <FaCheck className="text-white hidden hover:block" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#314f4a] flex justify-center items-center cursor-pointer">
              <FaCheck className="text-white hidden hover:block" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#31344f] flex justify-center items-center cursor-pointer">
              <FaCheck className="text-white hidden hover:block" />
            </div>
          </div>

          {/* Sizes */}
          <p className="text-sm text-gray-500 mb-2">Choose Size</p>
          <div className="flex space-x-3 mb-4">
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              Small
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              Medium
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              Large
            </button>
            <button className="px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white">
              X-Large
            </button>
          </div>

          <div className="border-b mb-4"></div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center border rounded-full px-4 py-2 space-x-4">
              <FiMinus />
              <span>1</span>
              <FaPlus />
            </div>
            <button className="w-full md:w-auto px-6 py-2 rounded-full bg-black text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <AllReviws/>
    <Fashion/>
    </>
  );
};

export default Page;
