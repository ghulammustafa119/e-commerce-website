

"use client"
import React, { useState } from "react";

const sizes = [
  "Small",
  "X-Small",
  "XX-Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3-Large",
  "4-Large",
];

const Size = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="px-6">
      <h2 className="text-xl font-bold text-black mt-7 mb-3">Size</h2>
      <div className="flex flex-wrap mt-2 gap-3 mb-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            className={`px-4 py-1 md:py-2 rounded-[10px] md:rounded-full ${
              selectedSize === size ? "bg-black text-white" : "bg-gray-200"
            } hover:bg-black hover:text-white`}
            aria-pressed={selectedSize === size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Size;
