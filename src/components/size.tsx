"use client";

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

interface SizeProps {
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
}

const Size = ({ selectedSizes, onSizeChange }: SizeProps) => {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-3">Size</h2>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-1.5 rounded-full text-sm ${
              selectedSizes.includes(size)
                ? "bg-black text-white"
                : "bg-[#F0F0F0] text-black/60 hover:bg-black hover:text-white"
            } transition-colors`}
            aria-pressed={selectedSizes.includes(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Size;
