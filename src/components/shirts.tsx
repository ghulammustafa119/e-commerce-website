// import React from "react";
// import { IProduct } from "./types";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import Link from "next/link";
// import Image from "next/image";

// const products: IProduct[] = [
//   {
//     title: "Gradient Graphic T-shirt",
//     id: 1,
//     price: "$145",
//     rating: "3.5/5",
//     img_url: "/images/Frame 33.png",
//   },
//   {
//     title: "Polo with Tipping Details",
//     id: 2,
//     price: "$180",
//     rating: "4.5/5",
//     img_url: "/images/Frame 34.png",
//   },
//   {
//     title: "Black Striped T-shirt",
//     id: 3,
//     price: "$120",
//     old_price: "$150",
//     discount: "-30%",
//     rating: "5.0/5",
//     img_url: "/images/Frame 38.png",
//   },
//   {
//     title: "SKINNY FIT JEANS",
//     id: 4,
//     price: "$240",
//     old_price: "$260",
//     discount: "-20%",
//     rating: "3.5/5",
//     img_url: "/images/one.png",
//   },
//   {
//     title: "CHECKERED SHIRT",
//     id: 5,
//     price: "$180",
//     rating: "4.5/5",
//     img_url: "/images/two.png",
//   },
//   {
//     title: "SLEEVE STRIPED T-SHIRT",
//     id: 6,
//     price: "$130",
//     old_price: "$160",
//     discount: "-30%",
//     rating: "4.5/5",
//     img_url: "/images/three.png",
//   },
//   {
//     title: "VERTICAL STRIPED SHIRT",
//     id: 7,
//     price: "$212",
//     old_price: "$232",
//     discount: "-20%",
//     rating: "5.0/5",
//     img_url: "/images/pic1.png",
//   },
//   {
//     title: "COURAGE GRAPHIC T-SHIRT",
//     id: 8,
//     price: "$145",
//     rating: "4.0/5",
//     img_url: "/images/pic2.png",
//   },
//   {
//     title: "LOOSE FIT BERMUDA SHORTS",
//     id: 9,
//     price: "$80",
//     rating: "3.0/5",
//     img_url: "/images/pic3.png",
//   },
// ];

// const Shirts = () => {
//   return (
//     <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
//       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mt-4 mb-6">
//         Casual
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((item) => {
//           // Extract numeric rating
//           const numericRating = item.rating
//             ? parseFloat(item.rating.split("/")[0]) || 0
//             : 0;

//           // Create array of stars based on numericRating
//           const stars = Array.from({ length: 5 }, (_, i) =>
//             i < numericRating ? (
//               <AiFillStar key={i} className="text-yellow-400" />
//             ) : (
//               <AiOutlineStar key={i} className="text-gray-300" />
//             )
//           );

//           return (
//             <div
//               key={item.id}
//               className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
//             >
//               <Link href={`/products/${item.id}`}>
//                 <div>
//                   <Image
//                     src={item.img_url}
//                     alt={item.title}
//                     width={295}
//                     height={298}
//                     className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//               </Link>
//               <div className="mt-4">
//                 <p className="text-sm sm:text-base font-bold text-gray-800">
//                   {item.title}
//                 </p>
//                 <div className="flex items-center mt-1">
//                   {stars}
//                   <p className="text-gray-500 text-xs ml-2">{item.rating}</p>
//                 </div>
//                 <p className="text-sm sm:text-base font-bold mt-2">
//                   {item.price}{" "}
//                   {item.old_price && (
//                     <span className="text-gray-400 line-through text-xs ml-2">
//                       {item.old_price}
//                     </span>
//                   )}
//                   {item.discount && (
//                     <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
//                       {item.discount}
//                     </span>
//                   )}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Shirts;




import React from "react";
import { IProduct } from "./types";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const products: IProduct[] = [
  {
    title: "Gradient Graphic T-shirt",
    id: 1,
    price: "$145",
    rating: "3.5/5",
    img_url: "/images/Frame 33.png",
  },
  {
    title: "Polo with Tipping Details",
    id: 2,
    price: "$180",
    rating: "4.5/5",
    img_url: "/images/Frame 34.png",
  },
  {
    title: "Black Striped T-shirt",
    id: 3,
    price: "$120",
    old_price: "$150",
    discount: "-30%",
    rating: "5.0/5",
    img_url: "/images/Frame 38.png",
  },
  {
    title: "SKINNY FIT JEANS",
    id: 4,
    price: "$240",
    old_price: "$260",
    discount: "-20%",
    rating: "3.5/5",
    img_url: "/images/one.png",
  },
  {
    title: "CHECKERED SHIRT",
    id: 5,
    price: "$180",
    rating: "4.5/5",
    img_url: "/images/two.png",
  },
  {
    title: "SLEEVE STRIPED T-SHIRT",
    id: 6,
    price: "$130",
    old_price: "$160",
    discount: "-30%",
    rating: "4.5/5",
    img_url: "/images/three.png",
  },
  {
    title: "VERTICAL STRIPED SHIRT",
    id: 7,
    price: "$212",
    old_price: "$232",
    discount: "-20%",
    rating: "5.0/5",
    img_url: "/images/pic1.png",
  },
  {
    title: "COURAGE GRAPHIC T-SHIRT",
    id: 8,
    price: "$145",
    rating: "4.0/5",
    img_url: "/images/pic2.png",
  },
  {
    title: "LOOSE FIT BERMUDA SHORTS",
    id: 9,
    price: "$80",
    rating: "3.0/5",
    img_url: "/images/pic3.png",
  },
];

const Shirts = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold uppercase mt-4 mb-6 text-center">
        Casual
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {products.map((item) => {
          const numericRating = item.rating
            ? parseFloat(item.rating.split("/")[0]) || 0
            : 0;

          const stars = Array.from({ length: 5 }, (_, i) =>
            i < numericRating ? (
              <AiFillStar key={i} className="text-yellow-400" />
            ) : (
              <AiOutlineStar key={i} className="text-gray-300" />
            )
          );

          return (
            <div
              key={item.id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/products/${item.id}`}>
                <div>
                  <Image
                    src={item.img_url}
                    alt={item.title}
                    width={295}
                    height={298}
                    className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="mt-4">
                <p className="text-sm sm:text-base font-bold text-gray-800">
                  {item.title}
                </p>
                <div className="flex items-center mt-1">
                  {stars}
                  <p className="text-gray-500 text-xs ml-2">{item.rating}</p>
                </div>
                <p className="text-sm sm:text-base font-bold mt-2">
                  {item.price}{" "}
                  {item.old_price && (
                    <span className="text-gray-400 line-through text-xs ml-2">
                      {item.old_price}
                    </span>
                  )}
                  {item.discount && (
                    <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                      {item.discount}
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shirts;
