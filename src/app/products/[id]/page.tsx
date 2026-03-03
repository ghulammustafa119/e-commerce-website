"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "next/navigation";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import AllReviws from "@/components/all-reviews";
import Fashion from "@/components/products";
import { BreadcrumbDemo } from "@/components/breadcrumb";

const starIcons = Array(5)
  .fill(null)
  .map((_, index) => <AiFillStar key={index} className="text-yellow-400" />);

interface IProduct {
  title: string;
  price: string;
  id: number;
  rating?: string;
  old_price?: string;
  img_url: string;
  img1: string;
  img2: string;
  img3: string;
  discount?: string;
}

const products: IProduct[] = [
  {
    title: "ONE LIFE GRAPHIC T-SHIRT",
    id: 1,
    price: "$260",
    old_price: "$300",
    discount: "-40%",
    img_url: "/images/pic1.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
  {
    title: "VERTICAL STRIPED SHIRT",
    id: 2,
    price: "$145",
    img_url: "/images/pic2.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
  {
    title: "LOOSE FIT BERMUDA SHORTS",
    id: 3,
    price: "$80",
    img_url: "/images/pic3.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
  {
    title: "FADED SKINNY JEANS",
    id: 4,
    price: "$210",
    img_url: "/images/pic4.png",
    img1: "/images/pro1.png",
    img2: "/images/pro3.png",
    img3: "/images/pro4.png",
  },
];

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const productData = products.find((item) => item.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(productData?.img1 || "");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!productData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${productData.title} to the cart!`);
  };

  return (
    <>
      <BreadcrumbDemo />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Column: Thumbnails */}
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 mb-4 md:mb-0">
            {[productData.img1, productData.img2, productData.img3].map((img, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View product image ${idx + 1}`}
                className={`cursor-pointer ${
                  selectedImage === img ? "border-2 border-black rounded-md" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`${productData.title} - view ${idx + 1}`}
                  width={111}
                  height={106}
                  className="md:w-[152px] md:h-[167px]"
                />
              </button>
            ))}
          </div>

          {/* Center Column: Main Image */}
          <div>
            <Image
              src={selectedImage}
              alt={productData.title}
              width={358}
              height={290}
              className="rounded-lg md:w-[444px] md:h-[530px]"
            />
          </div>

          {/* Right Column: Product Details */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              {productData.title}
            </h1>
            <div className="flex mb-2">{starIcons}</div>
            <p className="text-lg font-bold mb-2">
              {productData.price}{" "}
              {productData.old_price && (
                <span className="line-through text-gray-500">
                  {productData.old_price}
                </span>
              )}{" "}
              {productData.discount && (
                <span className="text-red-500">{productData.discount}</span>
              )}
            </p>
            <p className="text-gray-600 mb-4">
              This graphic t-shirt is perfect for any occasion. Crafted from a
              soft and breathable fabric, it offers superior comfort and style.
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
            </div>
          </div>
        </div>
      </div>
      <AllReviws />
      <Fashion />
    </>
  );
};

export default Page;
