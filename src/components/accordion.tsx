"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal } from "lucide-react";

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

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label
                  key={cat.value}
                  className="flex items-center justify-between cursor-pointer text-black/60 hover:text-black transition-colors"
                >
                  <span className="text-base">{cat.label}</span>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => onCategoryChange(cat.value)}
                    className="w-4 h-4 accent-black"
                  />
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
