"use client"
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { SheetSide } from "./sheet";
import { NavigationMenuDemo } from "./navigation-menu";
import Link from "next/link";
import HeaderTop from "./headerTop";
import { useCart } from "./cart-context";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
    <HeaderTop/>
    <header className="w-full h-[80px] max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <SheetSide />
        <h1 className="text-xl sm:text-3xl font-bold uppercase">shop.co</h1>
      </div>

      {/* Center Navigation */}
      <nav>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href={"/"}>
              <NavigationMenuDemo />
            </Link>
          </li>
          <li>
            <Link href={"/onsale"}>On Sale</Link>
          </li>
          <li>
            <Link href={"/arrivals"}>New Arrivals</Link>
          </li>
          <li>
            <Link href={"/brands"}>Brands</Link>
          </li>
        </ul>
      </nav>

      {/* Right Section */}
      <div className="flex items-center space-x-4 mr-[40px]">
        {/* Mobile Search Icon */}
        <button type="button" aria-label="Search" className="md:hidden">
          <IoSearch className="text-xl" />
        </button>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center w-[300px] lg:w-[400px] h-[48px] rounded-full bg-[#f0f0f0] px-4">
          <IoSearch className="text-xl" />
          <label htmlFor="header-search" className="sr-only">Search items</label>
          <input
            id="header-search"
            type="text"
            placeholder="Search items..."
            className="w-full h-full bg-transparent px-3 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Cart Icon */}
        <Link href="/arrivals" className="relative" aria-label="Shopping cart">
          <BsCart3 className="text-2xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* User Icon */}
        <button type="button" aria-label="User account">
          <FiUser className="text-2xl cursor-pointer" />
        </button>
      </div>

    </header>
    </>
  );
};

export default Header;
