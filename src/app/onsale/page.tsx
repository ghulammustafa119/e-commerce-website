"use client";

import { useState } from "react";
import { AccordionDemo } from "@/components/accordion";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { CheckboxDisabled } from "@/components/check-box";
import { DressStyle } from "@/components/dressStyle";
import Shirts, { FilterState } from "@/components/shirts";
import Size from "@/components/size";
import { SliderDemo } from "@/components/slider";

const Onsale = () => {
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
    <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-6 space-y-4 lg:space-y-0 px-4 sm:px-6 lg:px-8">
      {/* Left Sidebar */}
      <div className="w-full sm:w-[300px]">
        <BreadcrumbDemo />
        <AccordionDemo
          selectedCategories={filters.categories}
          onCategoryChange={handleCategoryChange}
          onClearAll={handleClearAll}
        />
        <SliderDemo
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
        <CheckboxDisabled
          selectedColors={filters.colors}
          onColorChange={handleColorChange}
        />
        <Size
          selectedSizes={filters.sizes}
          onSizeChange={handleSizeChange}
        />
        <DressStyle />
      </div>
      {/* Main Content */}
      <div className="w-full lg:w-[900px]">
        <Shirts filters={filters} />
      </div>
    </div>
  );
};

export default Onsale;
