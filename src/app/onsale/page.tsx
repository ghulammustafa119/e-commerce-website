"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AccordionDemo } from "@/components/accordion";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { CheckboxDisabled } from "@/components/check-box";
import { DressStyle } from "@/components/dressStyle";
import Shirts, { FilterState } from "@/components/shirts";
import Size from "@/components/size";
import { SliderDemo } from "@/components/slider";
import { SlidersHorizontal } from "lucide-react";

function OnsaleContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    colors: [],
    sizes: [],
  });

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleColorChange = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleSizeChange = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      colors: [],
      sizes: [],
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
      <BreadcrumbDemo />
      <div className="flex gap-6 mt-4">
        {/* Mobile filter toggle */}
        <button
          className="lg:hidden fixed bottom-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>

        {/* Left Sidebar */}
        <div
          className={`${
            showFilters ? "fixed inset-0 z-40 bg-white overflow-y-auto p-4" : "hidden"
          } lg:block lg:relative lg:w-[295px] shrink-0`}
        >
          {showFilters && (
            <button
              className="lg:hidden mb-4 text-sm text-black/60"
              onClick={() => setShowFilters(false)}
            >
              Close Filters
            </button>
          )}
          <div className="border border-black/10 rounded-[20px] p-5">
            <AccordionDemo
              selectedCategories={filters.categories}
              onCategoryChange={handleCategoryChange}
              onClearAll={handleClearAll}
            />
            <div className="border-t border-black/10 my-2" />
            <SliderDemo
              value={filters.priceRange}
              onChange={handlePriceChange}
            />
            <div className="border-t border-black/10 my-2" />
            <CheckboxDisabled
              selectedColors={filters.colors}
              onColorChange={handleColorChange}
            />
            <div className="border-t border-black/10 my-2" />
            <Size
              selectedSizes={filters.sizes}
              onSizeChange={handleSizeChange}
            />
            <div className="border-t border-black/10 my-2" />
            <DressStyle />
            <button
              className="w-full bg-black text-white py-3 rounded-full text-sm font-medium mt-4"
              onClick={() => setShowFilters(false)}
            >
              Apply Filter
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Shirts filters={filters} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default function Onsale() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><p>Loading...</p></div>}>
      <OnsaleContent />
    </Suspense>
  );
}
