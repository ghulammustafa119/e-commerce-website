"use client";

const colorOptions = [
  { value: "green", bg: "bg-green-500" },
  { value: "red", bg: "bg-red-500" },
  { value: "yellow", bg: "bg-yellow-400" },
  { value: "orange", bg: "bg-orange-500" },
  { value: "cyan", bg: "bg-cyan-400" },
  { value: "blue", bg: "bg-blue-500" },
  { value: "purple", bg: "bg-purple-500" },
  { value: "pink", bg: "bg-pink-400" },
  { value: "white", bg: "bg-white border border-black/10" },
  { value: "black", bg: "bg-black" },
];

interface CheckboxProps {
  selectedColors: string[];
  onColorChange: (color: string) => void;
}

export function CheckboxDisabled({ selectedColors, onColorChange }: CheckboxProps) {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-3">Colors</h2>
      <div className="flex flex-wrap gap-2.5">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`h-[37px] w-[37px] rounded-full ${color.bg} flex items-center justify-center transition-all ${
              selectedColors.includes(color.value) ? "ring-2 ring-offset-2 ring-black" : ""
            }`}
            aria-label={`${color.value} color filter`}
            aria-pressed={selectedColors.includes(color.value)}
          >
            {selectedColors.includes(color.value) && (
              <span className={`text-sm ${color.value === "white" ? "text-black" : "text-white"}`}>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
