
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row items-center bg-black text-white py-6 px-4">
        <div className="text-center md:text-left md:flex-1">
          <h1 className="text-lg md:text-2xl font-semibold mb-2">
            STAY UP TO DATE ABOUT
          </h1>
          <h1 className="text-lg md:text-2xl font-semibold">
            OUR LATEST OFFERS
          </h1>
        </div>
        <div className="flex flex-col md:flex-row mt-4 md:mt-0 gap-4 md:gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:w-auto bg-white text-black px-4 py-2 rounded-md text-sm"
          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-wrap justify-center md:justify-evenly bg-gray-100 text-black py-8 px-4">
        {/* Column 1 */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0 px-4">
          <h2 className="text-lg md:text-xl font-bold mb-4">SHOP.CO</h2>
          <p className="text-sm md:text-base mb-4">
            We have clothes that suit your style and which you’re proud to wear.
            From women to men.
          </p>
          <div className="flex gap-4 mb-4">
            <CiTwitter className="w-6 h-6" />
            <FaFacebook className="w-6 h-6" />
            <IoLogoInstagram className="w-6 h-6" />
            <FaGithub className="w-6 h-6" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0 px-4">
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0 px-4">
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="w-full md:w-1/5 mb-6 md:mb-0 px-4">
          <h3 className="text-lg font-semibold mb-4">FAQ</h3>
          <ul className="space-y-2 text-sm">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div className="w-full md:w-1/5 px-4">
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>YouTube Playlist</li>
          </ul>
        </div>

        {/* Payment Badges */}
        <div className="w-full mt-6 flex justify-end items-center gap-4 px-4">
          <Image
            src={"/images/badge4.png"}
            alt="badge-pic"
            width={46.61}
            height={30.03}
            className="h-14 -w-20"
          />
          <Image
            src={"/images/badge3.png"}
            alt="circle-pic"
            width={46.61}
            height={30.03}
            className="h-14 w-20"
          />
          <Image
            src="/images/badge2.png"
            alt="paypal-pic"
            width={46.61}
            height={30.03}
            className="h-14 w-20"
          />
           <Image
            src="/images/m.png"
            alt="paypal-pic"
            width={46.61}
            height={30.03}
            className="h-14 w-20"
          />
           <Image
            src="/images/badge2.png"
            alt="google-pic"
            width={46.61}
            height={30.03}
            className="h-14 w-20"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;