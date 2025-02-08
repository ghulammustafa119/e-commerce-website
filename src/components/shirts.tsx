
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Iproduct {
  image: string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
}

// Adding key prop in star array
const star = Array(5)
  .fill(null)
  .map((_, i) => <FaStar key={i} />);

export default function Shirts() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Iproduct[] = await client.fetch(
          `*[_type == 'product']{
            "image": image.asset->url,
            discountPercent,
            isNew,
            name,
            description,
            price,
            _id
          }[0...9]`
        );
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg font-bold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-[25px] font-bold relative pl-5">
        Casual
        <span className="text-sm font-bold flex items-center justify-center absolute right-10 top-2">
          Most Popular <RiArrowDropDownLine />
        </span>
      </h1>
      <div className="grid gap-3 grid-cols-2 xl:grid-cols-3 md:p-0 place-items-center">
        {products.map((data) => (
          <div className="mt-1" key={data._id}>
            <Link href={`/product/${data._id}`}>
              <div className="w-[160px] md:w-[240px] lg:w-[290px] h-[160px] md:h-[240px] lg:h-[290px] bg-[#F0EEED] rounded-[20px]">
                <Image
                  src={urlFor(data.image).url()}
                  alt={data.name}
                  className="w-full h-full rounded-[20px]"
                  width={290}
                  height={290}
                />
              </div>
            </Link>
            <div>
              <p className="text-sm md:text-lg mt-2 font-bold">{data.name}</p>
              <div className="flex text-yellow-400">{star}</div>
              <p className="font-bold mt-1">
                ${data.discountPercent > 0 
                  ? ((data.price * (100 - data.discountPercent)) / 100).toFixed(2)
                  : data.price}
                {data.discountPercent > 0 && (
                  <span className="text-gray-400 font-bold line-through ml-2">
                    ${data.price}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
