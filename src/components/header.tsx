"use client"
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { SheetSide } from "./sheet";
import { NavigationMenuDemo } from "./navigation-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderTop from "./headerTop";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { AiOutlineHeart } from "react-icons/ai";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/onsale?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
    <HeaderTop/>
    <header className="w-full h-[80px] max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <SheetSide />
        <h1 className="font-integralcf text-xl sm:text-[32px] font-bold uppercase">shop.co</h1>
      </div>

      {/* Center Navigation */}
      <nav className="hidden lg:flex items-center space-x-6">
        <NavigationMenuDemo />
        <Link href="/onsale">On Sale</Link>
        <Link href="/onsale?new=true">New Arrivals</Link>
        <Link href="/brands">Brands</Link>
      </nav>

      {/* Right Section */}
      <div className="flex items-center space-x-4 mr-2 lg:mr-10">
        {/* Mobile/Tablet Search Icon */}
        <button type="button" aria-label="Search" className="lg:hidden">
          <IoSearch className="text-xl" />
        </button>

        {/* Desktop Search Bar */}
        <div className="hidden lg:flex items-center w-[300px] xl:w-[400px] h-[48px] rounded-full bg-[#f0f0f0] px-4">
          <IoSearch className="text-xl" />
          <label htmlFor="header-search" className="sr-only">Search items</label>
          <input
            id="header-search"
            type="text"
            placeholder="Search items..."
            className="w-full h-full bg-transparent px-3 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
          />
        </div>

        {/* Wishlist Icon */}
        <Link href="/wishlist" className="relative" aria-label="Wishlist">
          <AiOutlineHeart className="text-2xl" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </Link>

        {/* Cart Icon */}
        <Link href="/arrivals" className="relative" aria-label="Shopping cart">
          <BsCart3 className="text-2xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* User */}
        {!isLoaded ? null : isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button type="button" className="bg-black text-white px-4 py-1.5 rounded-full text-sm">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>

    </header>
    </>
  );
};

export default Header;
