
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Offers from "./offer";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Offers />
      <div className="w-full h-auto max-w-screen-2xl mx-auto flex flex-wrap justify-center md:justify-evenly bg-gray-100 text-black py-8 px-5 md:px-20">
        {/* Column 1 */}
        <div className="w-full md:w-1/5 px-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">SHOP.CO</h2>
          <p className="text-sm md:text-base mb-4">
            We have clothes that suit your style and which you’re proud to wear. From women to men.
          </p>
          <div className="flex gap-4">
            <Link href="https://twitter.com" aria-label="Twitter">
              <CiTwitter className="w-6 h-6" />
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <IoLogoInstagram className="w-6 h-6" />
            </Link>
            <Link href="https://github.com" aria-label="GitHub">
              <FaGithub className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Other Columns */}
        {[{ title: "Company", items: ["About", "Features", "Works", "Career"] },
          { title: "Help", items: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
          { title: "FAQ", items: ["Account", "Manage Deliveries", "Orders", "Payments"] },
          { title: "Resources", items: ["Free eBooks", "Development Tutorial", "How to - Blog", "YouTube Playlist"] }
        ].map((col, index) => (
          <div key={index} className="w-full md:w-1/5 px-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">{col.title}</h3>
            <ul className="space-y-2 text-sm">
              {col.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Payment Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between items-center">
          <p className="text-[14px] md:text-left md:mr-[400px]">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="w-full md:w-auto mt-6 flex justify-center  items-center md:gap-4 gap-[4px] mx-5 md:mx-20">
            {[ "badge4.png", "badge3.png", "badge2.png", "m.png", "badge5.png" ].map((src, index) => (
              <Image
                key={index}
                src={`/images/${src}`}
                alt={`payment badge ${index}`}
                width={46.61}
                height={30.03}
                className="h-auto w-auto md:h-14 md:w-20"
                layout="intrinsic"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;






// import Link from "next/link";
// import { FaTwitter } from "react-icons/fa";
// import { BsFacebook } from "react-icons/bs";
// import { FaInstagram } from "react-icons/fa";
// import { FaSquareGithub } from "react-icons/fa6";
// import Image from "next/image";
// import Stayudpate from "./update";


// export default function Footer(){
//     return(
//         <main className="bg-[#F0F0F0] relative p-7 md:px-12 w-full h-full   md:h-[400px] flex flex-col  justify-start items-center mt-32">
          
//            <span className="absolute  top-[-60px]">
//            <Stayudpate />
//            </span>
           
//         <div className="w-full h-[60%] flex flex-col md:flex-row justify-between items-start mt-52  md:mt-20 border-b-2 pb-5">
//              {/* top div */}
//              <div className="w-full md:w-[40%] mt-5">
//                 <h1 className="text-2xl md:text-3xl font-extrabold">SHOP.CO</h1>
//                 <p className="mt-2 text-sm">We have clothes that suits your style and which you&apos;re proud to wear. From women to men.</p>
//                   <div className="flex space-x-2 mt-3">
//                          <FaTwitter className="text-xl"/>
//                         <BsFacebook className="text-xl"/>
//                        <FaInstagram className="text-xl"/>
//                     <FaSquareGithub className="text-xl"/>
//                   </div>
//              </div>
//              {/* bottom div */}
//              <div className=" w-full grid grid-cols-2 md:grid-cols-4 justify-between md:place-items-center ">
//                 {/* box1 */}
//              <div className="mt-4">
//                 <h2 className="text-xl">Company</h2>
//                 <ul className="space-y-1">
//                     <li className="font-sans">About</li>
//                     <li className="font-sans">Features</li>
//                     <li className="font-sans">Works</li>
//                     <li className="font-sans">Career</li>
//                 </ul>
//              </div>
//              {/* box 2 */}
//              <div>
//                 <h2 className="text-xl mt-4">Help</h2>
//                 <ul  className="space-y-1">
//                     <li className="font-sans">Customer Support</li>
//                     <li className="font-sans">Delivery Details</li>
//                     <li className="font-sans">Terms & Conditions</li>
//                     <li className="font-sans">Privacy Policy</li>
//                 </ul>
//              </div>
//              {/* box3 */}
//              <div className="space-y-1 mt-4">
//                 <h2 className="text-xl">FAQ</h2> <ul>
//                     <li className="font-sans">Account</li>
//                     <li className="font-sans">Manage Deliveries</li>
//                     <li className="font-sans">Orders</li>
//                     <li className="font-sans">Payments</li>
//                 </ul>
//              </div>
//              {/* box4 */}
//            <div  className="space-y-1 mt-4">
//                 <h2 className="text-xl">Resources</h2>
//                 <ul>
//                     <li className="font-sans">Free eBooks</li>
//                     <li className="font-sans">Development Tutorial</li>
//                     <li className="font-sans">How to - Blog</li>
//                     <li className="font-sans">Youtube Playlist </li>
//                 </ul>
//              </div>
//              {/* complete */}
//              </div>
//         </div>
//         <div className=" w-full flex flex-col md:flex-row items-center mt-5 md:mt-7 justify-between">
//             <p className="text-xs md:text-sm">Shop.co © 2000 2023 All Rights Reserved</p>
//             <div className="flex mt-4 md:mt-0">
//                 <Image src={"/images/badge2.png"}     
//                 className="w-[40px]" width={100} height={100} alt="visa"></Image>
//                 <Image src={"/images/badge3.png"} 
//                 className="w-[40px]" width={100} height={100} alt="apple-pay"></Image>
//                 <Image src={"/images/badge4.png"}   
//                 className="w-[40px]" width={100} height={100} alt="paypal"></Image>
//                 <Image src={"/images/badge5.png"}   
//                 className="w-[40px]" width={100} height={100} alt=""></Image>
//                 <Image src={"/images/g.png"}     
//                 className="w-[40px]" width={100} height={100} alt="gpay"></Image>
//             </div>
//         </div>
        
//         </main>
//     )
// }