"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
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
import { FaWhatsapp, FaFacebook, FaXTwitter } from "react-icons/fa6";
import { IoLinkOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useRecentlyViewed } from "@/components/recently-viewed-context";

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-lg" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-lg" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 text-lg" />);
    }
  }
  return stars;
}

interface SanityProduct {
  _id: string;
  name: string;
  price: number;
  discountPercent: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
}

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const [product, setProduct] = useState<SanityProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl ? urlFor(product.imageUrl).url() : "",
        discountPercent: product.discountPercent,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?._id]);

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
            category,
            "stock": coalesce(stock, 100)
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
      <div className="flex justify-center items-center py-20">
        <p className="text-lg font-medium">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center py-20">
        <h1 className="text-2xl font-bold text-red-500">
          {error || "Product not found"}
        </h1>
      </div>
    );
  }

  const discountedPrice =
    product.discountPercent > 0
      ? Math.round((product.price * (100 - product.discountPercent)) / 100)
      : null;

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment" && quantity < (product?.stock ?? 100)) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const productImageUrl = product.imageUrl ? urlFor(product.imageUrl).url() : "";

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: discountedPrice ?? product.price,
      imageUrl: productImageUrl,
      size: selectedSize || "Medium",
      color: selectedColor || "#534933",
      quantity,
    });
    toast.success(`Added ${quantity} of ${product.name} to the cart!`);
  };

  // Create thumbnail array (using same image 3 times as placeholder since Sanity has single image)
  const thumbnails = productImageUrl ? [productImageUrl, productImageUrl, productImageUrl] : [];
  const rating = 4.5;

  return (
    <>
      <BreadcrumbDemo />
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
          {/* Left Column: Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-3">
            {/* Thumbnails */}
            {thumbnails.length > 0 && (
              <div className="flex md:flex-col gap-3">
                {thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-[76px] h-[80px] md:w-[100px] md:h-[106px] lg:w-[152px] lg:h-[167px] rounded-[20px] overflow-hidden border-2 ${
                      selectedImageIndex === idx ? "border-black" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={thumb}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={152}
                      height={167}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            {/* Main Image */}
            <div className="flex-1 bg-[#F0EEED] rounded-[20px] overflow-hidden aspect-square md:aspect-auto md:h-[530px]">
              {productImageUrl ? (
                <Image
                  src={productImageUrl}
                  alt={product.name}
                  width={444}
                  height={530}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-300 rounded-[20px]">
                  <p className="text-gray-600">No image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex-1">
            <h1 className="font-integralcf text-2xl md:text-[40px] md:leading-[48px] font-bold mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-base">
                {rating}/<span className="text-black/60">5</span>
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl md:text-[32px] font-bold">
                ${discountedPrice ?? product.price}
              </span>
              {discountedPrice && (
                <>
                  <span className="text-2xl md:text-[32px] font-bold text-black/30 line-through">
                    ${product.price}
                  </span>
                  <span className="bg-red-500/10 text-[#FF3333] text-sm font-medium px-3.5 py-1.5 rounded-full">
                    -{product.discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {product.stock === 0 ? (
                <span className="text-sm font-medium text-red-500">Out of Stock</span>
              ) : product.stock <= 10 ? (
                <span className="text-sm font-medium text-orange-500">Low Stock - Only {product.stock} left</span>
              ) : (
                <span className="text-sm font-medium text-green-600">In Stock</span>
              )}
            </div>

            {/* Description */}
            <p className="text-black/60 text-base leading-[22px] mb-5 pb-5 border-b border-black/10">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-5 pb-5 border-b border-black/10">
              <p className="text-sm text-black/60 mb-3">Select Colors</p>
              <div className="flex gap-3" role="radiogroup" aria-label="Select color">
                {["#534933", "#314f4a", "#31344f"].map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Color option ${idx + 1}`}
                    aria-pressed={selectedColor === color}
                    className={`w-[37px] h-[37px] rounded-full flex justify-center items-center cursor-pointer transition-all ${
                      selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    <FaCheck className={`text-white text-sm ${selectedColor === color ? "block" : "hidden"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-5 pb-5 border-b border-black/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-black/60">Choose Size</p>
                <button
                  className="text-sm text-black/60 underline hover:text-black"
                  onClick={() => setShowSizeGuide(true)}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Small", "Medium", "Large", "X-Large"].map((size) => (
                  <button
                    key={size}
                    className={`px-5 py-2.5 rounded-full text-sm transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-black/60 hover:bg-black hover:text-white"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#F0F0F0] rounded-full px-5 py-3 gap-5">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => handleQuantityChange("decrement")}
                >
                  <FiMinus className="cursor-pointer text-lg" />
                </button>
                <span className="font-medium min-w-[20px] text-center">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => handleQuantityChange("increment")}
                >
                  <FaPlus className="cursor-pointer text-sm" />
                </button>
              </div>
              <button
                className="flex-1 py-3 rounded-full bg-black text-white text-base font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:border-red-500 transition-colors"
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
                  <AiFilledHeart className="text-red-500 text-xl" />
                ) : (
                  <AiOutlineHeart className="text-xl" />
                )}
              </button>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-black/10">
              <span className="text-sm text-black/60">Share:</span>
              <button
                className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                onClick={() => {
                  const url = `${window.location.origin}/products/${product._id}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(`${product.name} - ${url}`)}`, "_blank");
                }}
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp className="text-lg" />
              </button>
              <button
                className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors"
                onClick={() => {
                  const url = `${window.location.origin}/products/${product._id}`;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                }}
                aria-label="Share on Facebook"
              >
                <FaFacebook className="text-lg" />
              </button>
              <button
                className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                onClick={() => {
                  const url = `${window.location.origin}/products/${product._id}`;
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(product.name)}`, "_blank");
                }}
                aria-label="Share on X"
              >
                <FaXTwitter className="text-lg" />
              </button>
              <button
                className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                onClick={async () => {
                  const url = `${window.location.origin}/products/${product._id}`;
                  try {
                    await navigator.clipboard.writeText(url);
                    toast.success("Link copied to clipboard!");
                  } catch {
                    const input = document.createElement("input");
                    input.value = url;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand("copy");
                    document.body.removeChild(input);
                    toast.success("Link copied to clipboard!");
                  }
                }}
                aria-label="Copy link"
              >
                <IoLinkOutline className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white rounded-[20px] p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-black/60 hover:text-black">
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-black/10">
                  <th className="text-left py-2 font-semibold">Size</th>
                  <th className="text-center py-2 font-semibold">Chest (in)</th>
                  <th className="text-center py-2 font-semibold">Waist (in)</th>
                  <th className="text-center py-2 font-semibold">Hips (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "Small", chest: "34-36", waist: "28-30", hips: "36-38" },
                  { size: "Medium", chest: "38-40", waist: "32-34", hips: "40-42" },
                  { size: "Large", chest: "42-44", waist: "36-38", hips: "44-46" },
                  { size: "X-Large", chest: "46-48", waist: "40-42", hips: "48-50" },
                ].map((row) => (
                  <tr key={row.size} className="border-b border-black/10">
                    <td className="py-2.5 font-medium">{row.size}</td>
                    <td className="text-center py-2.5 text-black/60">{row.chest}</td>
                    <td className="text-center py-2.5 text-black/60">{row.waist}</td>
                    <td className="text-center py-2.5 text-black/60">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-black/40 mt-3">Measurements are in inches. For the best fit, measure yourself and compare with the chart above.</p>
          </div>
        </div>
      )}
      <AllReviws productId={id} productDescription={product?.description} />
      <Fashion category={product?.category} excludeId={product?._id} />

      {/* Recently Viewed */}
      {recentlyViewed.filter((item) => item.id !== product?._id).length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <h2 className="font-integralcf text-2xl md:text-[32px] font-bold text-center mb-8">
            RECENTLY VIEWED
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {recentlyViewed
              .filter((item) => item.id !== product?._id)
              .slice(0, 6)
              .map((item) => (
                <Link key={item.id} href={`/products/${item.id}`} className="shrink-0 w-[160px] sm:w-[200px] md:w-[250px]">
                  <div className="w-full aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} width={250} height={250} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-[20px]"><p>No Image</p></div>
                    )}
                  </div>
                  <p className="mt-2 text-sm md:text-base font-bold truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base md:text-lg font-bold">
                      ${item.discountPercent > 0 ? Math.round((item.price * (100 - item.discountPercent)) / 100) : item.price}
                    </span>
                    {item.discountPercent > 0 && (
                      <>
                        <span className="text-sm text-black/40 line-through">${item.price}</span>
                        <span className="bg-red-500/10 text-[#FF3333] text-[10px] px-2 py-0.5 rounded-full">-{item.discountPercent}%</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
