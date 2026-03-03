"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FaStar } from "react-icons/fa";

const star = Array(5)
  .fill(null)
  .map((_, i) => <FaStar key={i} className="text-yellow-400" />);

interface SearchProduct {
  _id: string;
  name: string;
  price: number;
  discountPercent: number;
  imageUrl: string;
}

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<SearchProduct[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      const data: SearchProduct[] = await client.fetch(
        `*[_type == 'product' && name match $searchTerm]{
          _id,
          name,
          price,
          discountPercent,
          "imageUrl": image.asset->url
        }[0...10]`,
        { searchTerm: `${query}*` } as Record<string, string>
      );
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      {/* Search Input */}
      <div className="ml-14 flex justify-center items-center">
        <label htmlFor="product-search" className="sr-only">Search products</label>
        <Input
          id="product-search"
          value={searchQuery}
          onChange={handleSearch}
          className="flex justify-start items-center lg:bg-[#F0F0F0] lg:w-[500px] h-[40px] pl-2 ml-12 md:ml-0 hover:border-none rounded-full"
          type="search"
          placeholder="Search products..."
        />
      </div>

      {/* Display Search Results */}
      <div className="mt-5">
        {products.length > 0 ? (
          <ul className="flex w-full justify-between">
            {products.map((data) => (
              <li key={data._id} className="flex-shrink-0">
                <Link href={`/product/${data._id}`}>
                  <div className="w-[200px] md:w-[283px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px]">
                    {data.imageUrl && (
                      <Image
                        src={urlFor(data.imageUrl).url()}
                        alt={data.name}
                        className="w-full h-full rounded-[20px] object-cover"
                        width={283}
                        height={290}
                      />
                    )}
                  </div>
                </Link>
                <div className="pl-2">
                  <p className="text-lg mt-2 font-bold">{data.name}</p>
                  <div className="flex text-yellow-400">{star}</div>
                  <p className="font-bold mt-1">
                    ${data.price}{" "}
                    {data.discountPercent > 0 && (
                      <span className="text-gray-400 font-bold line-through">
                        -{data.discountPercent}%
                      </span>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          searchQuery && <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
