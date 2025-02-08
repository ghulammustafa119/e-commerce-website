"use client"
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { SheetSide } from "./sheet"; // Mobile menu modal component
import { NavigationMenuDemo } from "./navigation-menu";
import Link from "next/link";
import HeaderTop from "./headerTop";

// Cart Item type
type CartItem = {
  id: number;
  name: string;
  quantity: number;
};

const Header = () => {
  // States for search and cart
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Handle cart toggle
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Handle search input change
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
            value={searchTerm}
            onChange={handleSearchChange} // Update search term
          />
        </div>

        {/* Cart Icon */}
        <div className="relative">

          <BsCart3 className="text-2xl" onClick={toggleCart} />

          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5">
              {cartItems.length}
            </span>
          )}
        </div>

        {/* User Icon */}
         <FiUser className="text-2xl cursor-pointer"  />
         </div>

      {/* Cart Modal (or sidebar) */}
      {isCartOpen && (
        <div className="absolute right-0 top-[80px] bg-white shadow-lg w-[300px] h-[400px] p-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <ul>
            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </li>
              ))
            )}
          </ul>
          <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md">
            Checkout
          </button>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;