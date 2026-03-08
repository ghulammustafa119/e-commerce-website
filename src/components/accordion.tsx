"use client";

import { SlidersHorizontal, ChevronRight } from "lucide-react";

const categories = [
  { value: "tshirt", label: "T-Shirts" },
  { value: "short", label: "Shorts" },
  { value: "shirt", label: "Shirts" },
  { value: "hoodie", label: "Hoodies" },
  { value: "jeans", label: "Jeans" },
];

interface AccordionDemoProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  onClearAll?: () => void;
}

export function AccordionDemo({ selectedCategories, onCategoryChange, onClearAll }: AccordionDemoProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Filters</h2>
        <SlidersHorizontal className="text-black/40 w-5 h-5" />
      </div>

      {selectedCategories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-3">
          {selectedCategories.map((cat) => {
            const label = categories.find((c) => c.value === cat)?.label || cat;
            return (
              <span
                key={cat}
                className="px-3 py-1 text-xs bg-[#F0F0F0] rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={() => onCategoryChange(cat)}
              >
                {label} &times;
              </span>
            );
          })}
          {onClearAll && (
            <button
              onClick={onClearAll}
              className="px-3 py-1 text-xs text-[#FF3333] bg-red-500/10 rounded-full hover:bg-red-500/20 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      <div className="space-y-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`flex items-center justify-between w-full py-2 transition-colors ${
              selectedCategories.includes(cat.value)
                ? "text-black font-medium"
                : "text-black/60 hover:text-black"
            }`}
          >
            <span className="text-base">{cat.label}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
