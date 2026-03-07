"use client";

import { useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import Link from "next/link";

function HeaderTop() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full h-[38px] bg-black text-white flex justify-center items-center max-w-screen-2xl mx-auto relative">
      <div className="flex items-center space-x-2">
        <h1 className="text-[8px] md:text-xs">
          Sign up and get 20% off to your first order.
        </h1>
        <Link href="/sign-up" className="underline underline-offset-4 text-xs md:text-sm">
          Sign Up Now
        </Link>
      </div>

      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="hidden md:block absolute right-[100px]"
      >
        <MdOutlineClear className="text-xl text-white" />
      </button>
    </div>
  );
}

export default HeaderTop;
