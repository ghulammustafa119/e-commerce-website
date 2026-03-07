"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";

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
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Filters</h1>
        <Filter className="text-gray-600" />
      </div>

      {selectedCategories.length > 0 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {selectedCategories.map((cat) => {
            const label = categories.find((c) => c.value === cat)?.label || cat;
            return (
              <span
                key={cat}
                className="px-2 py-1 text-xs bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                onClick={() => onCategoryChange(cat)}
              >
                {label} ✕
              </span>
            );
          })}
        </div>
      )}

      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`cat-${cat.value}`}
                    checked={selectedCategories.includes(cat.value)}
                    onChange={() => onCategoryChange(cat.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`cat-${cat.value}`} className="text-sm">
                    {cat.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {onClearAll && selectedCategories.length > 0 && (
        <button
          onClick={onClearAll}
          className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
