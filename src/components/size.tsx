"use client";

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

interface SizeProps {
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
}

const Size = ({ selectedSizes, onSizeChange }: SizeProps) => {
  return (
    <div className="px-6">
      <h2 className="text-xl font-bold text-black mt-7 mb-3">Size</h2>
      <div className="flex flex-wrap mt-2 gap-3 mb-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-1 md:py-2 rounded-[10px] md:rounded-full ${
              selectedSizes.includes(size) ? "bg-black text-white" : "bg-gray-200"
            } hover:bg-black hover:text-white`}
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
