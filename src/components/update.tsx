"use client";

import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "sonner";

export default function UpdateOffers() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.error || "Failed to subscribe");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-screen-2xl mx-auto flex justify-center items-center px-4 md:px-20 relative z-10 mb-[-80px]">
      <div className="w-full max-w-screen-2xl rounded-[20px] px-4 sm:px-10 md:px-16 py-8 md:py-9 bg-black flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-[551px]">
          <h1 className="font-integralcf text-[22px] leading-[30px] md:text-[40px] md:leading-[45px] text-white font-extrabold">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h1>
        </div>
        <div className="w-full md:w-[349px] space-y-3.5">
          <label className="flex items-center bg-white w-full py-3 px-4 rounded-full cursor-text text-black">
            <AiOutlineMail className="text-xl text-black/40 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email address"
              className="bg-transparent flex-1 ml-3 outline-none text-base caret-black placeholder:text-black/40"
            />
          </label>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full text-base font-medium bg-white text-black py-3 px-4 rounded-full disabled:opacity-50 hover:bg-gray-100 transition-colors"
          >
            {loading ? "Subscribing..." : "Subscribe to Newsletter"}
          </button>
        </div>
      </div>
    </main>
  );
}
