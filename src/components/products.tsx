
import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf, FaStar } from "react-icons/fa";
import Link from "next/link";

export interface IProduct {
  title: string;
  price: string;
  id: number;
  rating: string;
  old_price?: string;
  img_url: string;
  discount?: string;
  quantity: number;
}

const products: IProduct[] = [
  {
    title: "T-SHIRT WITH TAPE DETAILS",
    id: 1,
    price: "$120",
    img_url: "/images/pro1.png",
    rating: "4.5",
    quantity: 0,
  },
  {
    title: "SKINNY FIT JEANS",
    id: 2,
    price: "$120",
    img_url: "/images/pro2.png",
    old_price: "$200",
    rating: "4.0",
    quantity: 0,
  },
  {
    title: "CHECKERED SHIRT",
    id: 3,
    price: "$120",
    img_url: "/images/pro3.png",
    rating: "3.5",
    quantity: 0,
  },
  {
    title: "SLEEVE STRIPED T-SHIRT",
    id: 4,
    price: "$120",
    img_url: "/images/pro4.png",
    old_price: "$200",
    rating: "5.0",
    quantity: 0,
  },
];

const Fashion = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase mt-4 mb-4">
        You might also like
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((item) => {
          const numericRating = parseFloat(item.rating) || 0;
          const fullStars = Math.floor(numericRating);
          const halfStars = numericRating % 1 >= 0.5 ? 1 : 0;
          const emptyStars = 5 - fullStars - halfStars;

          return (
            <div
              key={item.id}
              className="w-[90%] sm:w-[45%] md:w-[22%] bg-white shadow-sm rounded-md p-4"
            >
              <Link href={`/products/${item.id}`} className="block">
                <Image
                  src={item.img_url}
                  alt={item.title}
                  width={270}
                  height={298}
                  priority
                  className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
                <div className="mt-4">
                  <p className="text-base font-bold">{item.title}</p>
                  <div className="flex items-center">
                    {[...Array(fullStars)].map((_, i) => (
                      <AiFillStar key={`full-${i}`} className="text-yellow-400" />
                    ))}
                    {halfStars > 0 && <FaStarHalf className="text-yellow-400" />}
                    {[...Array(emptyStars)].map((_, i) => (
                      <FaStar key={`empty-${i}`} className="text-gray-300" />
                    ))}
                    <p className="text-gray-400 text-[10px] ml-1">
                      {item.rating || "No rating"}
                    </p>
                  </div>
                  <p className="text-base font-bold mt-1">
                    {item.price}
                    {item.old_price && (
                      <span className="text-gray-400 line-through text-sm ml-2">
                        {item.old_price}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fashion;
