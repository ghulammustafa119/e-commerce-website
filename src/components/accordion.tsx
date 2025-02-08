
  "use client"
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "lucide-react";

export function AccordionDemo() {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({
    TShirts: [],
    Shorts: [],
    Shirts: [],
    Hoodie: [],
    Jeans: [],
  });

  const filterOptions = {
    TShirts: ["Graphic", "Plain", "V-Neck", "Crew Neck"],
    Shorts: ["Denim", "Cotton", "Athletic"],
    Shirts: ["Formal", "Casual", "Linen"],
    Hoodie: ["Zipper", "Pullover", "Oversized"],
    Jeans: ["Skinny", "Straight", "Bootcut"],
  };

  const handleFilterChange = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category]?.includes(option);
      const updatedFilters = isSelected
        ? prev[category].filter((item) => item !== option)
        : [...(prev[category] || []), option];
      return { ...prev, [category]: updatedFilters };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      TShirts: [],
      Shorts: [],
      Shirts: [],
      Hoodie: [],
      Jeans: [],
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Filters</h1>
        <Filter className="text-gray-600" />
      </div>

      {/* Display Selected Filters */}
      <div className="mt-4">
        {Object.entries(selectedFilters)
          .filter(([_, options]) => options.length > 0)
          .map(([category, options]) => (
            <div key={category} className="flex items-center gap-2 mb-2">
              <h2 className="font-semibold text-sm">{category}:</h2>
              <div className="flex gap-2 flex-wrap">
                {options.map((option) => (
                  <span
                    key={option}
                    className="px-2 py-1 text-xs bg-gray-200 rounded-full"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>

      <Accordion type="single" collapsible className="w-full mt-4">
        {Object.entries(filterOptions).map(([category, options]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`${category}-${option}`}
                      checked={selectedFilters[category]?.includes(option)}
                      onChange={() => handleFilterChange(category, option)}
                      className="w-4 h-4"
                    />
                    <label htmlFor={`${category}-${option}`} className="text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
      >
        Clear Filters
      </button>
    </div>
  );
}