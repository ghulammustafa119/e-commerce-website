"use client";

const colorOptions = [
  { value: "red", bg: "bg-red-500" },
  { value: "blue", bg: "bg-blue-500" },
  { value: "green", bg: "bg-green-500" },
  { value: "yellow", bg: "bg-yellow-500" },
  { value: "purple", bg: "bg-purple-500" },
  { value: "pink", bg: "bg-pink-500" },
  { value: "orange", bg: "bg-orange-500" },
  { value: "teal", bg: "bg-teal-500" },
  { value: "cyan", bg: "bg-cyan-500" },
  { value: "black", bg: "bg-black" },
];

interface CheckboxProps {
  selectedColors: string[];
  onColorChange: (color: string) => void;
}

export function CheckboxDisabled({ selectedColors, onColorChange }: CheckboxProps) {
  return (
    <div className="px-6 mt-4">
      <h2 className="font-bold text-lg mb-3">Colors</h2>
      <div className="flex flex-wrap gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`h-[44px] w-[44px] rounded-full ${color.bg} flex items-center justify-center transition-all ${
              selectedColors.includes(color.value) ? "ring-2 ring-offset-2 ring-black" : ""
            }`}
            aria-label={`${color.value} color filter`}
            aria-pressed={selectedColors.includes(color.value)}
          >
            {selectedColors.includes(color.value) && (
              <span className="text-white text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
