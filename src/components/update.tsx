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
    <main className="w-full flex justify-center items-center mb-14">
      <div className="w-[90%] md:w-full md:max-w-screen-xl md:h-[150px] rounded-[20px] p-6 sm:p-10 bg-black flex flex-col md:flex-row justify-between items-center">
        <div className="w-full lg:w-[600px]">
          <h1 className="text-2xl text-white md:text-3xl font-serif font-extrabold">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h1>
        </div>
        <div className="space-y-4 mt-2">
          <label className="flex items-center bg-[#F0F0F0] md:w-[300px] py-2 px-3 rounded-full cursor-text text-black">
            <AiOutlineMail className="text-xl text-gray-500 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              placeholder="Enter your email address"
              className="bg-transparent flex-1 ml-2 outline-none text-sm caret-black placeholder:text-gray-400"
            />
          </label>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full text-sm border bg-white py-2 px-10 rounded-[20px] disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe to Newsletter"}
          </button>
        </div>
      </div>
    </main>
  );
}
