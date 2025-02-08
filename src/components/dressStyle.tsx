
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

const dressStyles = [
  {
    value: "casual",
    label: "Casual",
    content: "Casual wear for everyday comfort and style.",
  },
  {
    value: "formal",
    label: "Formal",
    content: "Elegant formal wear for professional and special occasions.",
  },
  {
    value: "party",
    label: "Party",
    content: "Stylish outfits to stand out at any party or event.",
  },
  {
    value: "gym",
    label: "Gym",
    content: "Comfortable and functional clothing for workouts.",
  },
];

export function DressStyle() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-lg md:text-2xl">Dress Style</h1>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {dressStyles.map((style) => (
          <AccordionItem key={style.value} value={style.value}>
            <AccordionTrigger className="capitalize">{style.label}</AccordionTrigger>
            <AccordionContent>{style.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Apply Filter Button */}
      <div className="mt-6 flex justify-center items-center">
        <Button className="w-[90%] rounded-2xl py-3 px-6 text-lg hover:bg-opacity-90">
          Apply Filter
        </Button>
      </div>
    </div>
  );
}