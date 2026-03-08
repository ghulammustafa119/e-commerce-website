import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah M.",
    feedback:
      "\u201CI\u2019m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I\u2019ve bought has exceeded my expectations.\u201D",
    rating: 5,
    verified: true,
  },
  {
    name: "Alex K.",
    feedback:
      "\u201CFinding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.\u201D",
    rating: 5,
    verified: true,
  },
  {
    name: "James L.",
    feedback:
      "\u201CAs someone who\u2019s always on the lookout for unique fashion pieces, I\u2019m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\u201D",
    rating: 5,
    verified: true,
  },
  {
    name: "Michael B.",
    feedback:
      "\u201CShop.co\u2019s selection of clothes is not only diverse but also on-point with the latest trends. I\u2019m thrilled to have stumbled upon this amazing store.\u201D",
    rating: 5,
    verified: true,
  },
  {
    name: "Sophia K.",
    feedback:
      "\u201CThe selection of clothes at Shop.co is not only diverse but also aligned with the latest trends. I\u2019ve found some amazing pieces here!\u201D",
    rating: 5,
    verified: true,
  },
];

export default function Customers() {
  return (
    <main className="mt-14 mb-10">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="relative">
          <Carousel className="w-full relative">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-integralcf text-[26px] sm:text-3xl md:text-[48px] font-extrabold leading-tight">
                OUR HAPPY CUSTOMERS
              </h1>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <CarouselPrevious className="static translate-x-0 translate-y-0 w-8 h-8 md:w-10 md:h-10 text-gray-600 hover:text-black" />
                <CarouselNext className="static translate-x-0 translate-y-0 w-8 h-8 md:w-10 md:h-10 text-gray-600 hover:text-black" />
              </div>
            </div>
            <CarouselContent className="-ml-2">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 w-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="border border-black/10 rounded-[20px]">
                    <CardContent className="flex flex-col items-start justify-start p-6 md:p-8 min-h-[240px]">
                      <div className="flex items-center space-x-1 mb-3">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                          )
                        )}
                      </div>
                      <h2 className="flex items-center text-xl font-bold mb-3">
                        {testimonial.name}
                        {testimonial.verified && (
                          <FaCircleCheck className="text-green-500 ml-1 text-base" />
                        )}
                      </h2>
                      <p className="text-base text-black/60 leading-[22px]">
                        {testimonial.feedback}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </main>
  );
}
