"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import PaginationPage from "./pagination";

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
}

interface IProduct {
  imageUrl: string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
}

const PAGE_SIZE = 9;

const star = Array(5)
  .fill(null)
  .map((_, i) => <FaStar key={i} className="text-yellow-400" />);

interface ShirtsProps {
  filters?: FilterState;
  searchQuery?: string;
}

export default function Shirts({ filters, searchQuery }: ShirtsProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categories = filters?.categories || [];
        const minPrice = filters?.priceRange?.[0] ?? 0;
        const maxPrice = filters?.priceRange?.[1] ?? 500;
        const sizes = filters?.sizes || [];
        const colors = filters?.colors || [];

        let filterQuery = `_type == 'product'`;

        if (searchQuery) {
          filterQuery += ` && name match $searchQuery`;
        }
        if (categories.length > 0) {
          filterQuery += ` && category in $categories`;
        }
        filterQuery += ` && price >= $minPrice && price <= $maxPrice`;
        if (sizes.length > 0) {
          filterQuery += ` && count((sizes[])[@ in $sizes]) > 0`;
        }
        if (colors.length > 0) {
          filterQuery += ` && count((colors[])[@ in $colors]) > 0`;
        }

        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        const params = {
          categories,
          minPrice,
          maxPrice,
          sizes,
          colors,
          start,
          end,
          searchQuery: searchQuery ? `${searchQuery}*` : "",
        };

        const [fetchedProducts, count] = await Promise.all([
          client.fetch(
            `*[${filterQuery}]{
              "imageUrl": image.asset->url,
              discountPercent,
              isNew,
              name,
              description,
              price,
              _id
            } | order(name asc) [$start...$end]`,
            params
          ),
          client.fetch(`count(*[${filterQuery}])`, params),
        ]);

        setProducts(fetchedProducts);
        setTotalCount(count);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage, searchQuery]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center py-20">
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

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center px-2 sm:px-4 lg:px-5 mb-4">
        <h1 className="text-[25px] font-bold">{searchQuery ? `Results for "${searchQuery}"` : "Casual"}</h1>
        <span className="text-sm text-gray-500">{totalCount} products found</span>
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">No products match your filters.</p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 md:p-0 place-items-center">
          {products.map((data) => (
            <div className="mt-1" key={data._id}>
              <Link href={`/products/${data._id}`}>
                <div className="w-[160px] md:w-[240px] lg:w-[290px] h-[160px] md:h-[240px] lg:h-[290px] bg-[#F0EEED] rounded-[20px]">
                  {data.imageUrl ? (
                    <Image
                      src={urlFor(data.imageUrl).url()}
                      alt={data.name}
                      className="w-full h-full rounded-[20px] object-cover"
                      width={290}
                      height={290}
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center bg-gray-300 rounded-[20px]">
                      <p>No Image</p>
                    </div>
                  )}
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
      )}

      <PaginationPage
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
