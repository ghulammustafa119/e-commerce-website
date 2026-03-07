"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { FaStarHalf, FaStar } from "react-icons/fa";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface SanityProduct {
  _id: string;
  name: string;
  price: number;
  discountPercent: number;
  imageUrl: string;
  rating?: string;
}

interface FashionProps {
  category?: string;
  excludeId?: string;
}

const Fashion = ({ category, excludeId }: FashionProps) => {
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query: string;
        let params: Record<string, string> = {};

        if (category && excludeId) {
          query = `*[_type == "product" && category == $category && _id != $excludeId][0...4]{
            _id, name, price, discountPercent, "imageUrl": image.asset->url, rating
          }`;
          params = { category, excludeId };
        } else {
          query = `*[_type == "product"][0...4]{
            _id, name, price, discountPercent, "imageUrl": image.asset->url, rating
          }`;
        }

        const data = await client.fetch(query, params);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, excludeId]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">Loading recommendations...</p>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase mt-4 mb-4">
        You might also like
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((item) => {
          const numericRating = parseFloat(item.rating || "0");
          const fullStars = Math.floor(numericRating);
          const halfStars = numericRating % 1 >= 0.5 ? 1 : 0;
          const emptyStars = 5 - fullStars - halfStars;
          const discountedPrice = item.discountPercent > 0
            ? ((item.price * (100 - item.discountPercent)) / 100).toFixed(2)
            : null;
          const imageUrl = item.imageUrl ? urlFor(item.imageUrl).url() : "";

          return (
            <div
              key={item._id}
              className="w-[90%] sm:w-[45%] md:w-[22%] bg-white shadow-sm rounded-md p-4"
            >
              <Link href={`/products/${item._id}`} className="block">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    width={270}
                    height={298}
                    className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-[298px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">No Image</p>
                  </div>
                )}
                <div className="mt-4">
                  <p className="text-base font-bold">{item.name}</p>
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
                    ${discountedPrice || item.price}
                    {discountedPrice && (
                      <span className="text-gray-400 line-through text-sm ml-2">
                        ${item.price}
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
