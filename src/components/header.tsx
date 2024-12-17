import Link from "next/link";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { BiMenu } from "react-icons/bi";

const Header = () => {
  return (
    <>
      {/* Announcement Bar */}
      <div className="max-w-[1440px] h-[38px] bg-black text-white flex justify-center items-center px-4">
        <div className="w-full">
          <p className="text-[10px] sm:text-sm text-center font-normal md:ml-28">
            Sign up and get 20% off your first order.
            <button className="tex-[10px] sm:font-normal md:font-semibold underline cursor-pointer ml-2">
              Sign Up Now
            </button>
            </p>
        </div>
        <div>
          <p className="text-white font-bold text-lg hidden md:block md:mr-[70px]">x</p>
        </div>
      </div>
      {/* Main Header */}
      <div className="border-b-2">
        <div className=" max-w-[1440px] h-20 sm:mx-[90px] mx-[90px] flex justify-between items-center">
          <div className="flex items-center justify-center ">
            {/* Logo */}
            <div className="w-full flex">
            <BiMenu size={24} className="md:hidden" />
              <h2 className="text-black text-xl md:text-2xl font-bold ml-3">
              
                SHOP.CO
              </h2>
            </div>
            {/* Dropdown menu for mobile */}

            <select
              name="select"
              id="select"
              className="text-black hidden md:block bg-transparent border border-gray-300 rounded-md text-sm ml-3"
            >
              <option value="Shop">Shop</option>
            </select>
          </div>

          
         
             <div className="hidden md:block">
            <ul className="flex justify-evenly items-center space-x-5">
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
          <div className="flex items-center ">
            <div>
              <IoIosSearch size={24} className="rounded-[62px] ml-2" />
            </div>
            {/* Search Bar */}

            <input
              type="text"
              placeholder="Search for products..."
              className="w-full h-10 text-sm text-black placeholder-opacity-50 bg-transparent outline-none bg-[#f0f0f0] rounded-[62px] ml-2 hidden md:block"
            />
          </div>
          {/* Icons */}
          <div className="flex justify-between items-center">
            <div>
              {" "}
              <BsCart3 className="text-black text-lg md:mr-6 mr-4" />
            </div>
            <div>
              <FiUser className="text-black text-lg mr-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

