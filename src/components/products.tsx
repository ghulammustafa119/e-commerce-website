"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

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

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }
  return stars;
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
        <p className="text-black/60">Loading recommendations...</p>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-12 mb-16">
      <h1 className="font-integralcf text-3xl md:text-[48px] font-extrabold text-center uppercase mb-10">
        You might also like
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item) => {
          const rating = parseFloat(item.rating || "4.5");
          const discountedPrice = item.discountPercent > 0
            ? Math.round((item.price * (100 - item.discountPercent)) / 100)
            : null;

          return (
            <div key={item._id}>
              <Link href={`/products/${item._id}`}>
                <div className="w-full aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={295}
                      height={298}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-[20px] flex items-center justify-center">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="mt-3">
                <p className="text-base md:text-xl font-bold">{item.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex">{renderStars(rating)}</div>
                  <span className="text-sm">
                    {rating}/<span className="text-black/60">5</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-xl md:text-2xl font-bold">
                    ${discountedPrice ?? item.price}
                  </span>
                  {discountedPrice && (
                    <>
                      <span className="text-xl md:text-2xl font-bold text-black/40 line-through">
                        ${item.price}
                      </span>
                      <span className="bg-red-500/10 text-[#FF3333] text-xs font-medium px-3.5 py-1.5 rounded-full">
                        -{item.discountPercent}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fashion;
