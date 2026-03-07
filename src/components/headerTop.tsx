"use client";

import { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { SignUpButton } from "@clerk/nextjs";

function HeaderTop() {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={`w-full bg-black text-white flex justify-center items-center max-w-screen-2xl mx-auto relative overflow-hidden transition-all duration-300 ${
        visible ? "h-[38px]" : "h-0"
      }`}
    >
      <div className="flex items-center space-x-2">
        <h1 className="text-[8px] md:text-xs">
          Sign up and get 20% off to your first order.
        </h1>
        <SignUpButton mode="modal">
          <button className="underline underline-offset-4 text-xs md:text-sm">
            Sign Up Now
          </button>
        </SignUpButton>
      </div>

      <button
        onClick={() => setVisible(!visible)}
        aria-label="Toggle announcement"
        className="hidden md:block absolute right-[100px]"
      >
        <MdOutlineClear className="text-xl text-white" />
      </button>
    </div>
  );
}

export default HeaderTop;
