"use client";

import { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import { useClerk, useAuth } from "@clerk/nextjs";

function HeaderTop() {
  const [visible, setVisible] = useState(true);
  const { openSignUp } = useClerk();
  const { isSignedIn } = useAuth();

  if (isSignedIn) return null;

  return (
    <div className="relative">
      <div
        className={`w-full bg-black text-white flex justify-center items-center max-w-screen-2xl mx-auto transition-all duration-300 ${
          visible ? "h-[38px] opacity-100" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex items-center space-x-2">
          <h1 className="text-[8px] md:text-xs">
            Sign up and get 20% off to your first order.
          </h1>
          <button
            onClick={() => openSignUp()}
            className="underline underline-offset-4 text-xs md:text-sm cursor-pointer z-10"
          >
            Sign Up Now
          </button>
        </div>
      </div>

      <button
        onClick={() => setVisible(!visible)}
        aria-label="Toggle announcement"
        className="hidden md:flex absolute right-4 top-0 h-[38px] items-center z-20"
      >
        {visible ? (
          <MdOutlineClear className="text-xl text-white" />
        ) : (
          <IoChevronDown className="text-xl text-black" />
        )}
      </button>
    </div>
  );
}

export default HeaderTop;
