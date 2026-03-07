"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "next/navigation";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import AllReviws from "@/components/all-reviews";
import Fashion from "@/components/products";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "@/components/cart-context";
import { useWishlist } from "@/components/wishlist-context";
import { toast } from "sonner";
import { AiOutlineHeart, AiFillHeart as AiFilledHeart } from "react-icons/ai";

const starIcons = Array(5)
  .fill(null)
  .map((_, index) => <AiFillStar key={index} className="text-yellow-400" />);

interface SanityProduct {
  _id: string;
  name: string;
  price: number;
  discountPercent: number;
  description: string;
  imageUrl: string;
  category: string;
}

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [product, setProduct] = useState<SanityProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(
          `*[_type == 'product' && _id == $id][0]{
            _id,
            name,
            price,
            discountPercent,
            description,
            "imageUrl": image.asset->url,
            category
          }`,
          { id }
        );
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          {error || "Product not found"}
        </h1>
      </div>
    );
  }

  const discountedPrice =
    product.discountPercent > 0
      ? ((product.price * (100 - product.discountPercent)) / 100).toFixed(2)
      : null;

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: discountedPrice ? parseFloat(discountedPrice) : product.price,
      imageUrl: productImageUrl,
      size: selectedSize || "Medium",
      color: selectedColor || "#534933",
      quantity,
    });
    toast.success(`Added ${quantity} of ${product.name} to the cart!`);
  };

  const productImageUrl = product.imageUrl ? urlFor(product.imageUrl).url() : "";

  return (
    <>
      <BreadcrumbDemo />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Column: Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            {productImageUrl ? (
              <Image
                src={productImageUrl}
                alt={product.name}
                width={444}
                height={530}
                className="rounded-lg w-full max-w-[444px] h-auto object-cover"
              />
            ) : (
              <div className="w-[444px] h-[530px] bg-gray-300 rounded-lg flex justify-center items-center">
                <p className="text-gray-600">No image available</p>
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="flex-1 mt-6 md:mt-0">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              {product.name}
            </h1>
            <div className="flex mb-2">{starIcons}</div>
            <p className="text-lg font-bold mb-2">
              ${discountedPrice || product.price}{" "}
              {discountedPrice && (
                <>
                  <span className="line-through text-gray-500 ml-2">
                    ${product.price}
                  </span>
                  <span className="text-red-500 ml-2">
                    -{product.discountPercent}%
                  </span>
                </>
              )}
            </p>
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            {/* Colors */}
            <p className="text-sm text-gray-500 mb-2">Select Colors</p>
            <div className="flex space-x-3 mb-4" role="radiogroup" aria-label="Select color">
              {["#534933", "#314f4a", "#31344f"].map((color, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Color option ${idx + 1}`}
                  aria-pressed={selectedColor === color}
                  className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer ${
                    selectedColor === color ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  <FaCheck className={`text-white ${selectedColor === color ? "block" : "hidden"}`} />
                </button>
              ))}
            </div>

            {/* Sizes */}
            <p className="text-sm text-gray-500 mb-2">Choose Size</p>
            <div className="flex space-x-3 mb-4">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-1 md:py-2 rounded-[10px] md:rounded-full bg-gray-200 hover:bg-black hover:text-white ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex items-center border rounded-full px-4 py-2 space-x-4">
                <button type="button" aria-label="Decrease quantity" onClick={() => handleQuantityChange("decrement")}>
                  <FiMinus className="cursor-pointer" />
                </button>
                <span>{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => handleQuantityChange("increment")}>
                  <FaPlus className="cursor-pointer" />
                </button>
              </div>
              <button
                className="w-full md:w-auto px-6 py-2 rounded-full bg-black text-white"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="p-2 rounded-full border border-gray-300 hover:border-red-500 transition-colors"
                onClick={() => {
                  if (product) {
                    const inWishlist = isInWishlist(product._id);
                    toggleWishlist({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      imageUrl: productImageUrl,
                      discountPercent: product.discountPercent,
                    });
                    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
                  }
                }}
                aria-label="Toggle wishlist"
              >
                {product && isInWishlist(product._id) ? (
                  <AiFilledHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AllReviws productId={id} />
      <Fashion category={product?.category} excludeId={product?._id} />
    </>
  );
};

export default Page;
