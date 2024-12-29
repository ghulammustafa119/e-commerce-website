
import { IReviews } from "./types";
import { AiFillStar } from "react-icons/ai";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const Review: IReviews[] = [
  {
    name: "Samantha D.",
    feedback:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    rating: 4.5,
    verified: true,
    date: "Posted on August 14, 2023",
  },
  {
    name: "Alex M.",
    feedback:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    rating: 4,
    verified: false,
    date: "Posted on August 15, 2023",
  },
  {
    name: "Ethan R.",
    feedback:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    rating: 3.5,
    verified: true,
    date: "Posted on August 16, 2023",
  },
  {
    name: "Olivia P.",
    feedback:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    rating: 4,
    verified: true,
    date: "Posted on August 17, 2023",
  },
  {
    name: "Liam K.",
    feedback:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    rating: 5,
    verified: true,
    date: "Posted on August 18, 2023",
  },
  {
    name: "Ava H.",
    feedback:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    rating: 4.5,
    verified: true,
    date: "Posted on August 19, 2023",
  },
];

// Adding key prop in star array
let star = [
  <AiFillStar key={1} />,
  <AiFillStar key={2} />,
  <AiFillStar key={3} />,
  <AiFillStar key={4} />,
  <AiFillStar key={5} />,
];

export default function AllReviws() {
  return (
    <main className="max-w-screen-2xl mx-auto">
      {/* Top Section */}
      <div className="px-5 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-lg md:text-2xl font-semibold">All Reviews</h1>
        <div className="flex space-x-3 mt-3 md:mt-0">
          <Button variant={"outline"} className="hidden md:block">
            Latest
          </Button>
          <Button>Write Now Review</Button>
        </div>
      </div>

      {/* Reviews Container */}
      <div className="px-5 py-4 grid grid-cols-1 gap-4 md:grid-cols-2 ">
        {Review.map((data, i) => {
          return (
            <div className="border p-5 rounded-lg shadow-sm" key={i}>
              <div className="flex text-yellow-400">
                {star.map((icon, index) => (
                  <span key={index}>{icon}</span>
                ))}
              </div>
              <h2 className="font-bold text-lg mt-2 flex items-center space-x-2">
                <span>{data.name}</span>
                {data.verified && (
                  <Check className="w-4 h-4 bg-green-700 rounded-full text-white" />
                )}
              </h2>
              <p className="text-sm mt-2 text-gray-600">{data.feedback}</p>
              <p className="mt-4 text-xs text-gray-400">{data.date}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
