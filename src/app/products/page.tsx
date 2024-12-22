import React from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import Link from "next/link";
import { IProduct } from "@/components/types";

const product: IProduct[] = [
  {
    title: "VERTICAL STRIPED SHIRT",
    id: 1,
    price: "$212",
    rating: "5.0/5",
    old_price: "$232",
    discount: "-20%",
    img_url: "/images/pic1.png",
  },
  {
    title: "COURAGE GRAPHIC T-SHIRT",
    id: 2,
    price: "$145",
    rating: "4.0/5",
    img_url: "/images/pic2.png",
  },
  {
    title: "LOOSE FIT BERMUDA SHORTS",
    id: 3,
    price: "$80",
    rating: "3.0/5",
    img_url: "/images/pic3.png",
  },
  {
    title: "FADED SKINNY JEANS",
    id: 4,
    price: "$210",
    rating: "4.5/5",
    img_url: "/images/pic4.png",
  },
];

const Products = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10">
      {/* Top Selling Section */}
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase mt-4 mb-4">
        Top Selling
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
      {/* View All Button */}
      <div className=" w-full flex justify-center mt-8">
        <button className="bg-black text-white py-2 px-6 text-sm rounded-lg hover:bg-gray-800 transition-colors duration-300">
          View All
        </button>
      </div>

      {/* Browse by Dress Style */}
      <h1 className="text-3xl md:text-4xl font-bold text-center uppercase mt-12 mb-8">
        Browse by Dress Style
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full bg-[#f0f0f0] p-6 rounded-lg">
        <div className="flex flex-col items-center gap-6">
          <Image
            src={"/images/casual.png"}
            alt="casual-pic"
            width={307}
            height={289}
            className="w-full max-w-[300px] h-auto border-2 p-4 rounded-lg shadow-sm"
          />
          <Image
            src={"/images/gym.png"}
            alt="gym-pic"
            width={307}
            height={289}
            className="w-full max-w-[300px] h-auto border-2 p-4 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col items-center gap-6">
          <Image
            src={"/images/formal.png"}
            alt="formal-pic"
            width={400}
            height={289}
            className="w-full max-w-[400px] h-auto border-2 p-4 rounded-lg shadow-sm"
          />
          <Image
            src={"/images/party.png"}
            alt="party-pic"
            width={400}
            height={289}
            className="w-full max-w-[400px] h-auto border-2 p-4 rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
