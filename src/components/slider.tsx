"use client";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface SliderDemoProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

export function SliderDemo({ value, onChange, className }: SliderDemoProps) {
  const handleSliderChange = (val: number[]) => {
    onChange([val[0], val[1]]);
  };

  return (
    <div className="px-6">
      <h1 className="font-bold mb-4 text-lg">Price Range</h1>
      <Slider
        value={value}
        onValueChange={handleSliderChange}
        max={500}
        step={5}
        className={cn("w-[90%]", className)}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold text-sm px-4">${value[0]}</span>
        <span className="font-bold text-sm px-10">${value[1]}</span>
      </div>
    </div>
  );
}
