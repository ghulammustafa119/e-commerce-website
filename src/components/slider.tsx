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
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-3">Price</h2>
      <Slider
        value={value}
        onValueChange={handleSliderChange}
        max={500}
        step={5}
        className={cn("w-full", className)}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-black/60">${value[0]}</span>
        <span className="text-sm text-black/60">${value[1]}</span>
      </div>
    </div>
  );
}
