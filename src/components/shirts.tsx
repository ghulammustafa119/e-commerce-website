"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import PaginationPage from "./pagination";

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  dressStyle: string;
  isNew?: boolean;
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
        const dressStyle = filters?.dressStyle || "";

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
        if (dressStyle) {
          filterQuery += ` && dressStyle == $dressStyle`;
        }
        if (filters?.isNew) {
          filterQuery += ` && isNew == true`;
        }

        const start = (currentPage - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        const params = {
          categories,
          minPrice,
          maxPrice,
          sizes,
          colors,
          dressStyle,
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
        <h1 className="text-2xl md:text-[32px] font-bold">{searchQuery ? `Results for "${searchQuery}"` : filters?.isNew ? "New Arrivals" : "Casual"}</h1>
        <div className="flex items-center gap-2 text-sm text-black/60">
          <span className="hidden sm:inline">
            Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, totalCount)}-{Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount} Products
          </span>
          <span className="sm:hidden">{totalCount} products</span>
          <span className="hidden md:inline">Sort by: <span className="text-black font-medium">Most Popular</span></span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">No products match your filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {products.map((data) => (
            <div key={data._id}>
              <Link href={`/products/${data._id}`}>
                <div className="w-full aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden">
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
              <div className="mt-2">
                <p className="text-sm md:text-lg font-bold">{data.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">{renderStars(4.5)}</div>
                  <span className="text-xs md:text-sm">4.5/<span className="text-black/60">5</span></span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base md:text-xl font-bold">
                    ${data.discountPercent > 0
                      ? Math.round((data.price * (100 - data.discountPercent)) / 100)
                      : data.price}
                  </span>
                  {data.discountPercent > 0 && (
                    <>
                      <span className="text-base md:text-xl font-bold text-black/40 line-through">
                        ${data.price}
                      </span>
                      <span className="bg-red-500/10 text-[#FF3333] text-[10px] md:text-xs font-medium px-2 py-1 rounded-full">
                        -{data.discountPercent}%
                      </span>
                    </>
                  )}
                </div>
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
