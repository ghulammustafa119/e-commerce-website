import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Offers from "./update";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <Offers />
      <div className="w-full max-w-screen-2xl mx-auto bg-gray-100 text-black pt-28 pb-10 px-4 sm:px-10 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row md:justify-between gap-y-8">
            {/* Column 1 - Brand */}
            <div className="w-full md:w-[248px]">
              <h2 className="font-integralcf text-[28px] md:text-[33px] font-extrabold mb-4">
                SHOP.CO
              </h2>
              <p className="text-sm leading-[22px] text-black/60 mb-6">
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
                  <FaTwitter className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
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

            {/* Footer Links - 2x2 grid on mobile, row on desktop */}
            <div className="grid grid-cols-2 md:flex md:gap-x-16 lg:gap-x-24 gap-y-8">
              {/* Column 2 - Company */}
              <div>
                <h3 className="text-base font-medium uppercase tracking-[3px] mb-4 md:mb-6">
                  Company
                </h3>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-black/60">
                  <li>About</li>
                  <li>Features</li>
                  <li>Works</li>
                  <li>Career</li>
                </ul>
              </div>

              {/* Column 3 - Help */}
              <div>
                <h3 className="text-base font-medium uppercase tracking-[3px] mb-4 md:mb-6">
                  Help
                </h3>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-black/60">
                  <li><Link href="/contact" className="hover:text-black transition-colors">Customer Support</Link></li>
                  <li>Delivery Details</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>

              {/* Column 4 - FAQ */}
              <div>
                <h3 className="text-base font-medium uppercase tracking-[3px] mb-4 md:mb-6">
                  FAQ
                </h3>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-black/60">
                  <li>Account</li>
                  <li>Manage Deliveries</li>
                  <li>Orders</li>
                  <li>Payments</li>
                </ul>
              </div>

              {/* Column 5 - Resources */}
              <div>
                <h3 className="text-base font-medium uppercase tracking-[3px] mb-4 md:mb-6">
                  Resources
                </h3>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base text-black/60">
                  <li>Free eBooks</li>
                  <li>Development Tutorial</li>
                  <li>How to - Blog</li>
                  <li>Youtube Playlist</li>
                </ul>
              </div>
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
