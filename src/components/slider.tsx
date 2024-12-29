import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

type SliderProps = React.ComponentProps<typeof Slider>

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
   <div className="px-6">
    <h1 className="font-bold mb-4">Price</h1>
      <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[90%]", className)}
      {...props}
    />
    <div className="flex justify-between items-center">
        <h1 className="font-bold mt-1 px-4">$50</h1>
        <h1 className="font-bold mt-1 px-10">$100</h1>
    </div>
   </div>

  )
}
