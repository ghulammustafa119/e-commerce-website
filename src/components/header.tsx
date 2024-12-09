
import Link from 'next/link';
import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full h-[38px] bg-black text-white flex justify-center items-center font-serif px-4">
        <p className="text-sm text-center font-normal">
          Sign up and get 20% off your first order.  
          <span className="font-semibold underline cursor-pointer ml-2">
            Sign Up Now
          </span>
        </p>
      </div>

      {/* Main Header */}
      <div className="border-b-2">
        <div className="flex flex-wrap items-center justify-between ml-32 max-w-[1366px] mx-auto py-4 px-4">
          {/* Logo and Navigation */}
          <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
            <h2 className="text-black text-xl md:text-2xl font-bold">SHOP.CO</h2>

            {/* Dropdown menu for mobile */}
            <select 
              name="select" 
              id="select" 
              className="text-black ml-4 md:ml-8 bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="Shop">Shop</option>
            </select>

            {/* Navigation Links (hidden on mobile) */}
            <ul className="hidden md:flex ml-6 space-x-6 text-black text-sm md:text-base font-normal">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/onsale">On Sale</Link>
              </li>
              <li>
                <Link href="../arrivals">New Arrivals</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
            </ul>
          </div>

          {/* Search and Icons */}
          <div className="flex items-center w-full mr-32 md:w-auto space-x-4">
            {/* Search Bar */}
            <button className="flex items-center bg-gray-100 rounded-[50px] px-3 py-2 w-full md:w-[343px]">
              <IoIosSearch className="text-black mr-20 w-[200px]" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-[500px] text-sm text-black placeholder-opacity-50 bg-transparent outline-none mr-4"
              />
            </button>

            {/* Icons */}
            <div className="flex space-x-4">
              <BsCart3 className="text-black text-lg mr-6" />
              <FiUser className="text-black text-lg mr-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;