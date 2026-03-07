import React from "react";
import { FaFacebook } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Offers from "./update";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Offers />
      <div className="w-full bg-gray-100 text-black py-10 px-4 sm:px-10 md:px-20">
        <div className="max-w-screen-xl mx-auto">
          {/* Main footer content */}
          <div className="flex flex-wrap justify-between gap-y-8">
            {/* Column 1 - Brand */}
            <div className="w-full sm:w-[248px]">
              <h2 className="font-integralcf text-[28px] md:text-[33px] font-bold mb-6">
                SHOP.CO
              </h2>
              <p className="text-sm leading-[22px] text-black/60 mb-8">
                We have clothes that suits your style and which you&apos;re
                proud to wear. From women to men.
              </p>
              <div className="flex gap-3">
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-7 h-7 bg-white border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <CiTwitter className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <FaFacebook className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 bg-white border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <IoLogoInstagram className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-7 h-7 bg-white border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Column 2 - Company */}
            <div>
              <h3 className="text-base font-medium uppercase tracking-[3px] mb-6">
                Company
              </h3>
              <ul className="space-y-4 text-base text-black/60">
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>

            {/* Column 3 - Help */}
            <div>
              <h3 className="text-base font-medium uppercase tracking-[3px] mb-6">
                Help
              </h3>
              <ul className="space-y-4 text-base text-black/60">
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* Column 4 - FAQ */}
            <div>
              <h3 className="text-base font-medium uppercase tracking-[3px] mb-6">
                FAQ
              </h3>
              <ul className="space-y-4 text-base text-black/60">
                <li>Account</li>
                <li>Manage Deliveries</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>

            {/* Column 5 - Resources */}
            <div>
              <h3 className="text-base font-medium uppercase tracking-[3px] mb-6">
                Resources
              </h3>
              <ul className="space-y-4 text-base text-black/60">
                <li>Free eBooks</li>
                <li>Development Tutorial</li>
                <li>How to - Blog</li>
                <li>Youtube Playlist</li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-black/10 mt-12 mb-6" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-black/60">
              Shop.co &copy; 2000-2023, All Rights Reserved
            </p>
            <div className="flex items-center gap-3">
              {[
                { src: "badge4.png", alt: "Visa" },
                { src: "badge3.png", alt: "Mastercard" },
                { src: "badge2.png", alt: "PayPal" },
                { src: "g.png", alt: "Apple Pay" },
                { src: "badge5.png", alt: "Google Pay" },
              ].map((badge, index) => (
                <Image
                  key={index}
                  src={`/images/${badge.src}`}
                  alt={badge.alt}
                  width={47}
                  height={30}
                  className="h-[30px] w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
