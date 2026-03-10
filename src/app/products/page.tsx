"use client";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IProduct } from "@/components/types";

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

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts: IProduct[] = await client.fetch(
          `*[_type == 'product']{
            "imageUrl": image.asset->url,
            category,
            discountPercent,
            isNew,
            name,
            description,
            price,
            "avgRating": math::avg(*[_type == "review" && product._ref == ^._id].rating),
            "reviewCount": count(*[_type == "review" && product._ref == ^._id]),
            _id
          }[4...8]`
        );
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-12">
      <h1 className="font-integralcf text-3xl md:text-[48px] text-center font-bold">
        NEW ARRIVALS
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {products.map((product) => {
          const productPrice = Number(product.price) || 0;
          const discountRate = product.discountPercent / 100;
          const originalPrice = discountRate > 0 && discountRate < 1 ? productPrice / (1 - discountRate) : 0;
          const rating = product.avgRating || 0;

          return (
            <div key={product._id}>
              <Link href={`/products/${product._id}`}>
                <div className="w-full aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden">
                  {product.imageUrl ? (
                    <Image
                      src={urlFor(product.imageUrl).url()}
                      alt={product.name}
                      width={295}
                      height={298}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center bg-gray-300 rounded-[20px]">
                      <p className="text-gray-600">No Image</p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="mt-3">
                <p className="text-base md:text-xl font-bold">{product.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex">{renderStars(rating)}</div>
                  <span className="text-sm">
                    {rating}/<span className="text-black/60">5</span>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 mt-1">
                  <span className="text-xl md:text-2xl font-bold">${productPrice}</span>
                  {product.discountPercent > 0 && originalPrice > 0 && (
                    <>
                      <span className="text-xl md:text-2xl font-bold text-black/40 line-through">
                        ${Math.round(originalPrice)}
                      </span>
                      <span className="bg-red-500/10 text-[#FF3333] text-xs font-medium px-3.5 py-1.5 rounded-full">
                        -{product.discountPercent}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/onsale?new=true">
          <button className="border border-black/10 text-black text-base font-medium px-14 py-4 rounded-full hover:bg-gray-50 transition-colors">
            View All
          </button>
        </Link>
      </div>
      <div className="w-full h-px bg-black/10 mt-10" />
    </div>
  );
};

export default Products;
