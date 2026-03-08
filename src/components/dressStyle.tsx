import { ChevronRight } from "lucide-react";

const dressStyles = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "party", label: "Party" },
  { value: "gym", label: "Gym" },
];

export function DressStyle() {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-3">Dress Style</h2>
      <div className="space-y-1">
        {dressStyles.map((style) => (
          <button
            key={style.value}
            className="flex items-center justify-between w-full py-2 text-black/60 hover:text-black transition-colors"
          >
            <span className="text-base">{style.label}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
