import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import { IProduct } from "./types";

const product: IProduct[] = [
  {
    title: "T-SHIRT WITH TAPE DETAILS",
    id: 1,
    price: "$120",
    rating: "4.5/5",
    img_url: "/images/four.png",
  },
  {
    title: "SKINNY FIT JEANS",
    id: 2,
    price: "$240",
    rating: "3.5/5",
    old_price: "$260",
    discount: "-20%",
    img_url: "/images/one.png",
  },
  {
    title: "CHECKERED SHIRT",
    id: 3,
    price: "$180",
    rating: "4.5/5",
    img_url: "/images/two.png",
  },
  {
    title: "SLEEVE STRIPED T-SHIRT",
    id: 4,
    price: "$130",
    rating: "4.5/5",
    old_price: "$160",
    discount: "-30%",
    img_url: "/images/three.png",
  },
];

const Hero1 = () => {
  return (
    <div className="max-w-[1440px] h-auto px-4 sm:px-6 md:px-20">
      <h1 className="text-xl sm:text-2xl md:text-4xl mt-4 mb-4 text-center font-bold">
        NEW ARRIVALS
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {product.map((item) => {
          const numericRating = item.rating
            ? parseFloat(item.rating.split("/")[0]) || 0
            : 0;

          // Dynamically generate stars based on rating
          const stars = Array.from({ length: 5 }, (_, i) =>
            i < Math.floor(numericRating) ? (
              <AiFillStar key={i} className="text-yellow-400" />
            ) : (
              < FaStarHalf key={i} className="text-yellow-400" />
            )
          );

          return (
            <div
              key={item.id}
              className="w-[90%] sm:w-[45%] md:w-[22%] bg-white shadow-sm rounded-md p-4"
            >
              <Image
                src={item.img_url}
                alt={item.title}
                width={270}
                height={298}
                className="rounded-md"
              />
              <div className="mt-4">
                <p className="text-base font-bold">{item.title}</p>
                <div className="flex items-center">
                  {stars}
                  <span className="text-gray-400 text-[10px] ml-1">
                    {item.rating}
                  </span>
                </div>
                <p className="text-base font-bold mt-1">
                  {item.price}{" "}
                  {item.old_price && (
                    <span className="text-gray-400 line-through text-sm ml-2">
                      {item.old_price}
                    </span>
                  )}
                  {item.discount && (
                    <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {item.discount}
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full mt-8 flex justify-center">
        <button className="px-6 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors duration-300">
          View All
        </button>
      </div>
    </div>
  );
};

export default Hero1;
