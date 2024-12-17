"use client";
import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

let star = [
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
  <AiFillStar />,
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
    title: "VERTICAL STRIPED SHIRT",
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
    title: "COURAGE GRAPHIC T-SHIRT",
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

const page = () => {
  const params = useParams();
  const id = params.id;
  const data = product.find((item) => item.id === Number(id));

  if (!data) {
    return <h1>product not found</h1>;
  }
  return (
    <div className="max-[1440px] h-auto mx-5 md:mx-20 flex flex-col justify-between md:flex-row md:items-center md:flex md:justify-between items-center">
      <div className=" mx-4 mt-7">
        <Image
          src={data.img1}
          alt="pics"
          width={152}
          height={167}
          className="mb-4"
        ></Image>
        <Image
          src={data.img2}
          alt="pics"
          width={152}
          height={167}
          className="mb-4"
        ></Image>
        <Image
          src={data.img3}
          alt="pics"
          width={152}
          height={167}
          className="mb-4"
        ></Image>
      </div>

      <div className="mx-4">
        <Image src={data.img1} alt="pics" width={444} height={530} className=""></Image>
      </div>

      <div className="w-[600px] h-[500px]">
        <h1 className="font-bold text-lg mb-1">One Life Graphic T-shirt</h1>
        <div className="flex text-yellow-400 mb-1">{star}</div>
        <p className="text-lg font-bold leading-tight mb-1">
          {data.price} <span>{data.old_price}</span>{" "}
          <span>{data.discount}</span>
        </p>
        <p className="mb-4">
          This graphic t-shirt which is perfect for any occasion. Crafted from a
          soft and breathable fabric, it offers superior comfort and style.
        </p>
        <div className="w-full border-b-[1px] mb-4"></div>
        <p className="font-normal text-base text-black opacity-60 mb-4">
          Select Colors
        </p>
        <div className="flex flex-col items-center md:flex-row  mb-4 space-x-3">
          <div className="bg-[#534933] w-[37px] h-[37px] rounded-full mb-4 cursor-pointer flex justify-center items-center"><FaCheck className="text-white hidden hover:block" /></div>
          <div className="bg-[#314f4a] w-[37px] h-[37px] rounded-full mb-4 cursor-pointer flex justify-center items-center"><FaCheck className="text-white hidden hover:block" /></div>
          <div className="bg-[#31344f]  w-[37px] h-[37px] rounded-full  mb-4  cursor-pointer flex justify-center items-center"><FaCheck className="text-white hidden hover:block" /></div>
        </div>
        
          <div className="w-full border-b-[1px] mb-4"></div>
          <div className="font-normal text-base text-black opacity-60">
          <p className="mb-4">Choose Size</p>
        
        <div className=" space-x-3">
          <button className="w-[86px] h-[46px] rounded-[62px] bg-[#f0f0f0] hover:bg-black hover:text-white mb-8">
            Small
          </button>
          <button className="w-[105px] h-[46px] rounded-[62px] bg-[#f0f0f0] hover:bg-black hover:text-white">
            Medium
          </button>
          <button className="w-[89px] h-[46px] rounded-[62px] bg-[#f0f0f0] hover:bg-black hover:text-white">
            Large
          </button>
          <button className="w-[104px] h-[46px] rounded-[62px] bg-[#f0f0f0] hover:bg-black hover:text-white ">
            X-Large
          </button>
          </div>
        </div>
        <div className="w-full border-b-[1px] mb-8"></div>
        <div className="flex flex-col md:flex-row space-x-3">
          <button className="flex justify-between items-center w-[170px] h-[52px] rounded-[62px] bg-[#f0f0f0] px-5 py-4">
            <FiMinus />
            1
            <FaPlus />
          </button>
          <button className="w-[400px] h-[52px] rounded-[62px] bg-black text-white px-[54px] py-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
