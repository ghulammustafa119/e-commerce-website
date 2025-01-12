import React from "react";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Offers from "./offer";

const Footer = () => {
  return (
    <>
     <Offers/>
      <div className="w-full h-auto max-w-screen-2xl mx-auto flex flex-wrap justify-center md:justify-evenly bg-gray-100 text-black py-8 px-5 md:px-20">
        {/* Column 1 */}
        <div className="w-full md:w-1/5 px-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">SHOP.CO</h2>
          <p className="text-sm md:text-base mb-4">
            We have clothes that suit your style and which you’re proud to wear.
            From women to men.
          </p>
          <div className="flex gap-4">
            <CiTwitter className="w-6 h-6" />
            <FaFacebook className="w-6 h-6" />
            <IoLogoInstagram className="w-6 h-6" />
            <FaGithub className="w-6 h-6" />
          </div>
        </div>

        {/* Other Columns */}
        {[
          { title: "Company", items: ["About", "Features", "Works", "Career"] },
          {
            title: "Help",
            items: [
              "Customer Support",
              "Delivery Details",
              "Terms & Conditions",
              "Privacy Policy",
            ],
          },
          {
            title: "FAQ",
            items: ["Account", "Manage Deliveries", "Orders", "Payments"],
          },
          {
            title: "Resources",
            items: [
              "Free eBooks",
              "Development Tutorial",
              "How to - Blog",
              "YouTube Playlist",
            ],
          },
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
            {[
              "badge4.png",
              "badge3.png",
              "badge2.png",
              "m.png",
              "badge5.png",
            ].map((src, index) => (
              <Image
                key={index}
                src={`/images/${src}`}
                alt={`badge-${index}`}
                width={46.61}
                height={30.03}
                className="h-auto w-auto md:h-14 md:w-20"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
