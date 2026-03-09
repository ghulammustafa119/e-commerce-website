"use client";

import { useState } from "react";
import { ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

const dressStyles = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "party", label: "Party" },
  { value: "gym", label: "Gym" },
];

interface DressStyleProps {
  selectedStyle?: string;
  onStyleChange?: (style: string) => void;
}

export function DressStyle({ selectedStyle, onStyleChange }: DressStyleProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h2 className="font-bold text-lg">Dress Style</h2>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-black/60" />
        ) : (
          <ChevronDown className="w-4 h-4 text-black/60" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-1">
          {dressStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => onStyleChange?.(style.value)}
              className={`flex items-center justify-between w-full py-2 transition-colors ${
                selectedStyle === style.value
                  ? "text-black font-medium"
                  : "text-black/60 hover:text-black"
              }`}
            >
              <span className="text-base">{style.label}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
