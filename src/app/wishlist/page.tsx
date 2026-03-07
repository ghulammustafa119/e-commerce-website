"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/components/wishlist-context";
import { useCart } from "@/components/cart-context";
import { AiFillHeart } from "react-icons/ai";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.discountPercent > 0
        ? parseFloat(((item.price * (100 - item.discountPercent)) / 100).toFixed(2))
        : item.price,
      imageUrl: item.imageUrl,
      size: "Medium",
      color: "#000",
      quantity: 1,
    });
    removeFromWishlist(item.id);
    toast.success(`${item.name} moved to cart!`);
  };

  return (
    <>
      <div className="pl-5">
        <BreadcrumbDemo />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
            <Link href="/products" className="bg-black text-white px-6 py-2 rounded-full">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistItems.map((item) => {
              const discountedPrice = item.discountPercent > 0
                ? ((item.price * (100 - item.discountPercent)) / 100).toFixed(2)
                : null;

              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => {
                      removeFromWishlist(item.id);
                      toast("Removed from wishlist");
                    }}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 shadow-md"
                    aria-label="Remove from wishlist"
                  >
                    <AiFillHeart className="text-red-500 text-xl" />
                  </button>

                  <Link href={`/products/${item.id}`}>
                    <div className="bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                    <h3 className="font-bold mt-2 text-sm">{item.name}</h3>
                    <p className="font-bold text-sm">
                      ${discountedPrice || item.price}
                      {discountedPrice && (
                        <>
                          <span className="line-through text-gray-400 ml-2">${item.price}</span>
                          <span className="text-red-500 ml-1 text-xs">-{item.discountPercent}%</span>
                        </>
                      )}
                    </p>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full mt-2 bg-black text-white py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
