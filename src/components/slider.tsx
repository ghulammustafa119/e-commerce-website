

"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 80]);

  const handleSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div className="px-6">
      <h1 className="font-bold mb-4 text-lg">Price Range</h1>

      {/* Range Slider */}
      <Slider
        value={priceRange}
        onValueChange={handleSliderChange}
        max={100}
        step={1}
        className={cn("w-[90%]", className)}
        {...props}
      />

      {/* Dynamic Price Display */}
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-sm px-4">${priceRange[0]}</span>
        <span className="font-bold text-sm px-10">${priceRange[1]}</span>
      </div>
    </div>
  );
}
