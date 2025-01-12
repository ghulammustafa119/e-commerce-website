
import Link from "next/link";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { SheetSide } from "./sheet";
import { NavigationMenuDemo } from "./navigation-menu";

const Header = () => {
  return (
    <header className="w-full h-[80px] max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <SheetSide />
        <h1 className="text-xl sm:text-3xl font-bold uppercase">shop.co</h1>
      </div>

      {/* Center Navigation */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <Link href={"/"}>
            <NavigationMenuDemo />
          </Link>
        </li>
        <li>
          <Link href={"/on-sale"}>On Sale</Link>
        </li>
        <li>
          <Link href={"/new-arrivals"}>New Arrivals</Link>
        </li>
        <li>
          <Link href={"/brands"}>Brands</Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center space-x-4 mr-[40px]">
        {/* Mobile Search Icon */}
        <IoSearch className="text-xl md:hidden" />

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center w-[300px] lg:w-[400px] h-[48px] rounded-full bg-[#f0f0f0] px-4">
          <IoSearch className="text-xl" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full h-full bg-transparent px-3 focus:outline-none"
          />
        </div>

        {/* Icons */}
        <BsCart3 className="text-2xl" />
        <FiUser className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;