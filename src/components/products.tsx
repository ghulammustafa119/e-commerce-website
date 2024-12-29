import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import Link from "next/link";
import { IProduct } from "@/components/types";

const product: IProduct[] = [
  {
    title: "Polo with Contrast Trims",
    id: 1,
    price: "$212",
    rating: "4.0/5",
    old_price: "$242",
    discount: "-20%",
    img_url: "/images/Frame 32.png",
  },
  {
    title: "Gradient Graphic T-shirt",
    id: 2,
    price: "$145",
    rating: "3.0/5",
    img_url: "/images/Frame 33.png",
  },
  {
    title: "Polo with Tipping Details",
    id: 3,
    price: "$180",
    rating: "4.0/5",
    img_url: "/images/Frame 34.png",
  },
  {
    title: "Black Striped T-shirt",
    id: 4,
    price: "$120",
    rating: "5.5/5",
    old_price: "$150",
    discount: "-30%",
    img_url: "/images/Frame 38.png",
  },
];

const Fashion = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10">
      {/* Top Selling Section */}
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase mt-4 mb-4">
      You might also like
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {product.map((item) => {
          // Extract numeric rating
          const numericRating = item.rating
            ? parseFloat(item.rating.split("/")[0]) || 0
            : 0;

          // Create array of stars based on numericRating
          const stars = Array.from({ length: 5 }, (_, i) =>
            i < Math.floor(numericRating) ? (
              <AiFillStar key={i} className="text-yellow-400" />
            ) : (
              <FaStarHalf key={i} className="text-yellow-400" />
            )
          );

          return (
            <div
              key={item.id}
              className="w-[90%] sm:w-[45%] md:w-[22%] bg-white shadow-sm rounded-md p-4"
            >
              <Link href={`/products/${item.id}`}>
                <div>
                  <Image
                    src={item.img_url}
                    alt={item.title}
                    width={270}
                    height={298}
                    className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="mt-4">
                <p className="text-base font-bold">{item.title}</p>
                <div className="flex items-center">
                  {stars}
                  <p className="text-gray-400 text-[10px] ml-1">
                    {item.rating}
                  </p>
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
    </div>
    );
};
export default Fashion;