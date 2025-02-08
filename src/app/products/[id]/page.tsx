
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "next/navigation";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import AllReviws from "@/components/all-reviews";
import Fashion from "@/components/products";
import { BreadcrumbDemo } from "@/components/bredcrumb";

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
  const id = params.id;
  const productData = products.find((item) => item.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(productData?.img1 || "");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!productData) {
    return <h1>Product not found</h1>;
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
              <Image
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={111}
                height={106}
                className={`cursor-pointer md:w-[152px] md:h-[167px] ${
                  selectedImage === img ? "border-2 border-black" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Center Column: Main Image */}
          <div>
            <Image
              src={selectedImage}
              alt="Main Product Image"
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
            <div className="flex space-x-3 mb-4">
              {["#534933", "#314f4a", "#31344f"].map((color, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer ${
                    selectedColor === color ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  <FaCheck className={`text-white ${selectedColor === color ? "block" : "hidden"}`} />
                </div>
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
                <FiMinus className="cursor-pointer" onClick={() => handleQuantityChange("decrement")} />
                <span>{quantity}</span>
                <FaPlus className="cursor-pointer" onClick={() => handleQuantityChange("increment")} />
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







// "use client";
// import Image from "next/image";
// import { FaStar } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import { BreadcrumbDemo } from "@/components/bredcrumb";
// import Fashion from "@/components/products";
// import AllReviws from "@/components/all-reviews";


// // Adding key prop in star array
// let star = [
//   <FaStar key={1} />, <FaStar key={2} />, <FaStar key={3} />, <FaStar key={4} />, <FaStar key={5} />,
// ];

// interface IProducts {
//   image: string[];
//   discountPercent: number;
//   isNew: boolean;
//   name: string;
//   description: string;
//   price: number;
//   _id: string;
//   colors: string[];
//   sizes: string[];
// }

// export default function SlugPage({ params }: { params: { id: string } }) {
//   const [product, setProduct] = useState<IProducts | null>(null);
//   const [cartItem, setCartItem] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const products: IProducts[] = await client.fetch(
//           `*[_type == 'product']{
//             "image": image.asset->url,
//             category,
//             discountPercent,
//             isNew,
//             name,
//             description,
//             price,
//             _id,
//             colors,
//             sizes  
//           }`
//         );

//         const slug = products.find((item) => item._id === params.id);

//         if (!slug) {
//           setError(true);
//         } else {
//           setProduct(slug);
//           setCartItem({
//             id: slug._id,
//             name: slug.name,
//             image: slug.image,
//             price: slug.price,
//             size: slug.sizes[0],
//             color: slug.colors[0],
//             qty: 1,
//             discount: slug.discountPercent,
//           });
//         }
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [params.id]);

//   if (loading) {
//     return <h1 className="text-center mt-36 font-bold">Loading...</h1>;
//   }

//   if (error || !product) {
//     return <div className="mt-36 text-red-500 text-center font-bold">
//        <BreadcrumbDemo/>
//       Product not found</div>;
//   }

//   return (
//     <>
//     <div className="mt-28 md:mt-36">
//        <BreadcrumbDemo/>
//       <div className="flex h-full items-center flex-col md:flex-row justify-center sm:justify-evenly sm:p-0 max-w-screen-2xl mx-auto">
//         {/* Left */}
//         <div className="flex space-x-4 md:space-x-0 md:space-y-3 p-5 md:flex-col justify-between items-center md:w-[200px] order-2 md:order-1">
//           {product.image &&
//             <Image
//               key={product._id}
//               src={urlFor(product.image).url()}
//               className="w-[100px] h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
//               alt={product.name}
//               width={100}
//               height={100}
//             />
//           }
//         </div>
//         {/* Mid */}
//         <div className="w-[90%] pb-3 h-[260px] lg:w-[500px] md:h-[500px] mt-5 lg:mt-0 order-1 md:order-2">
//           {product.image &&
//             <Image
//               key={product._id}
//               src={urlFor(product.image).url()}
//               className="w-full h-full sm:mt-3 rounded-[20px]"
//               alt={product.name}
//               width={100}
//               height={100}
//             />
//           }
//         </div>
//         {/* Right */}
//         <div className="w-full p-5 lg:w-[500px] lg:h-[500px] order-3">
//           <h1 className="text-2xl lg:text-3xl font-bold">{cartItem.name}</h1>
//           <div className="flex text-yellow-400">{star}</div>
//           <div className="flex items-center space-x-2">
//             <p className="font-bold">{cartItem.price * cartItem.qty}</p>
//             {cartItem.discount > 0 && (
//               <span className="text-gray-400 line-through">
//                 {(cartItem.price - (cartItem.price * cartItem.discount) / 100) * cartItem.qty}
//               </span>
//             )}
//             {cartItem.discount > 0 && (
//               <span className="bg-red-400 rounded-[10px]">{`-${cartItem.discount}%`}</span>
//             )}
//           </div>
//           <p className="text-sm">{product.description}</p>
//           {/* Select Color */}
//           <div className="mt-5">
//             <p className="text-gray-500">Select Colors</p>
//             <div className="flex space-x-3 mt-2">
//               {product.colors.map((color, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCartItem({ ...cartItem, color })}
//                   className="w-[37px] h-[37px] border border-black active:outline rounded-full flex justify-center items-center"
//                   style={{ backgroundColor: color }}
//                 ></button>
//               ))}
//             </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//     <AllReviws />
//           <Fashion />
//     </>
//   );
// }








// "use client";
// import Image from "next/image";
// import { FaStar } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
// import { BreadcrumbDemo } from "@/components/bredcrumb";
// import Fashion from "@/components/products";
// import AllReviws from "@/components/all-reviews";

// // Adding key prop in star array
// const star = Array(5)
//   .fill(null)
//   .map((_, i) => <FaStar key={i} />);

// interface IProducts {
//   image: string[];
//   discountPercent: number;
//   isNew: boolean;
//   name: string;
//   description: string;
//   price: number;
//   _id: string;
//   colors: string[];
//   sizes: string[];
// }

// export default function Page({ params }: { params: { id: string } }) {
//   const [product, setProduct] = useState<IProducts | null>(null);
//   const [cartItem, setCartItem] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         setError(false);
        
//         const products: IProducts[] = await client.fetch(
//           `*[_type == 'product']{
//             "image": image.asset->url,
//             discountPercent,
//             isNew,
//             name,
//             description,
//             price,
//             _id,
//             colors,
//             sizes  
//           }`
//         );
//         console.log(product)
//         const slug = products.find((item) => item._id === params.id);

//         if (!slug) {
//           setError(true);
//         } else {
//           setProduct(slug);
//           setCartItem({
//             id: slug._id,
//             name: slug.name,
//             image: slug.image,
//             price: slug.price,
//             size: slug.sizes?.[0] || "",
//             color: slug.colors?.[0] || "",
//             qty: 1,
//             discount: slug.discountPercent || 0,
//           });
//         }
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [params.id]);

//   if (loading) {
//     return <h1 className="text-center mt-36 font-bold">Loading...</h1>;
//   }

//   if (error || !product) {
//     return (
//       <div className="mt-36 text-red-500 text-center font-bold">
//         <BreadcrumbDemo />
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="mt-28 md:mt-36">
//         <BreadcrumbDemo />
//         <div className="flex h-full items-center flex-col md:flex-row justify-center sm:justify-evenly sm:p-0 max-w-screen-2xl mx-auto">
//           {/* Left */}
//           <div className="flex space-x-4 md:space-x-0 md:space-y-3 p-5 md:flex-col justify-between items-center md:w-[200px] order-2 md:order-1">
//             {product.image && (
//               <Image
//                 key={product._id}
//                 src={urlFor(product.image).url()}
//                 className="w-[100px] h-[100px] md:h-[150px] lg:mt-3 rounded-[20px]"
//                 alt={product.name}
//                 width={100}
//                 height={100}
//               />
//             )}
//           </div>

//           {/* Mid */}
//           <div className="w-[90%] pb-3 h-[260px] lg:w-[500px] md:h-[500px] mt-5 lg:mt-0 order-1 md:order-2">
//             {product.image && (
//               <Image
//                 key={product._id}
//                 src={urlFor(product.image).url()}
//                 className="w-full h-full sm:mt-3 rounded-[20px]"
//                 alt={product.name}
//                 width={100}
//                 height={100}
//               />
//             )}
//           </div>

//           {/* Right */}
//           <div className="w-full p-5 lg:w-[500px] lg:h-[500px] order-3">
//             <h1 className="text-2xl lg:text-3xl font-bold">{cartItem?.name}</h1>
//             <div className="flex text-yellow-400">{star}</div>
//             <div className="flex items-center space-x-2">
//               <p className="font-bold">{cartItem?.price * cartItem?.qty}</p>
//               {cartItem?.discount > 0 && (
//                 <span className="text-gray-400 line-through">
//                   {cartItem?.price * cartItem?.qty}
//                 </span>
//               )}
//               {cartItem?.discount > 0 && (
//                 <span className="bg-red-400 rounded-[10px] px-2 py-1">
//                   -{cartItem?.discount}%
//                 </span>
//               )}
//             </div>
//             <p className="text-sm">{product.description}</p>

//             {/* Select Color */}
//             <div className="mt-5">
//               <p className="text-gray-500">Select Colors</p>
//               <div className="flex space-x-3 mt-2">
//                 {product.colors.map((color, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCartItem({ ...cartItem, color })}
//                     className="w-[37px] h-[37px] border border-black rounded-full flex justify-center items-center"
//                     style={{ backgroundColor: color }}
//                   ></button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <AllReviws />
//       <Fashion />
//     </>
//   );
// }
