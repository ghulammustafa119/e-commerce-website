
"use client";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import{IProduct} from "@/components/types"


const star = Array(5).fill(<FaStar className="text-yellow-400" />);

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
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto h-auto px-4 sm:px-6 md:px-20">
      <h1 className="text-xl sm:text-2xl md:text-4xl mt-4 mb-4 text-center font-bold uppercase">
        New Arrivals
      </h1>
      <div className="relative mt-10 flex space-x-2 px-2 overflow-x-auto">
        {products.map((product) => {
          console.log(product); 

          const productPrice = Number(product.price) || 0; 
          const originalPrice = productPrice / (1 - product.discountPercent / 100);
          const discountAmount = originalPrice - productPrice;

          return (
            <div key={product._id}>
              <Link href={`/product/${product._id}`}>
                <div className="w-[200px] md:w-[270px] h-[200px] md:h-[290px] bg-[#F0EEED] rounded-[20px] overflow-hidden mx-auto">
                  {product.imageUrl ? (
                    <Image
                      src={urlFor(product.imageUrl).url()}
                      alt={product.name}
                      width={270}
                      height={298}
                      className="w-full rounded-lg shadow-md hover:scale-125 transition-transform duration-500 object-cover h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex justify-center items-center bg-gray-300">
                      <p className="text-gray-600 uppercase">Something went wrong</p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="pl-2 mt-2">
                <p className="text-lg font-bold">{product.name}</p>
                <div className="flex">{star}</div>
                <p className="font-bold mt-1">
                  ${productPrice.toFixed(2)} {/* Discounted Price */}
                  {product.discountPercent > 0 && (
                    <>
                      <span className="text-gray-400 font-bold line-through ml-2">
                        ${originalPrice.toFixed(2)} {/* Original Price */}
                      </span>
                      <span className="text-green-600 ml-2">
                        (Save ${discountAmount.toFixed(2)}) {/* Discount Amount */}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-5">
        <Link href="/onsale">
          <Button variant="default" className="w-[80%] sm:w-[200px] rounded-[20px]">
            View all
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
