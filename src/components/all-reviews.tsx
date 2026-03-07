"use client";

import { useEffect, useState, useCallback } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import ReviewForm from "./review-form";

interface Review {
  _id: string;
  author: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
}

interface AllReviewsProps {
  productId?: string;
}

export default function CustomerReviews({ productId }: AllReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      setReviews(data);
    } catch {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <main className="md:mt-14">
      <div className="flex justify-between items-center border-b-2 pb-3 p-2 md:px-10 max-w-screen-2xl mx-auto">
        <span className="text-sm hover:font-bold cursor-pointer text-gray-400 hover:text-gray-700 hover:underline underline-offset-4">Product Details</span>
        <span className="text-sm hover:font-bold cursor-pointer text-gray-400 hover:text-gray-700 hover:underline underline-offset-4">Rating & Reviews</span>
        <span className="text-sm hover:font-bold cursor-pointer text-gray-400 hover:text-gray-700 hover:underline underline-offset-4">FAQs</span>
      </div>
      <div className="w-full flex justify-center items-center mb-1 max-w-screen-xl mx-auto">
        <div className="w-[95%] p-3 md:p-0">
          <div className="flex justify-between items-center">
            <h1 className="text-black text-xl md:text-2xl pt-4 ml-2 text-center md:text-left">
              All Reviews
              {reviews.length > 0 && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({reviews.length}) - Avg: {avgRating}/5
                </span>
              )}
            </h1>
            <div className="flex items-center space-x-2 mt-4 md:mr-4">
              <div className="hidden md:block">
                <Button variant={"outline"} className="rounded-[16px]">
                  Latest <RiArrowDropDownLine className="ml-2 text-xl" />
                </Button>
              </div>
              <Button className="rounded-[16px]" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Write a Review"}
              </Button>
            </div>
          </div>

          {showForm && productId && (
            <div className="mt-4">
              <ReviewForm
                productId={productId}
                onReviewSubmitted={() => {
                  setShowForm(false);
                  fetchReviews();
                }}
              />
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-10">
              <p className="text-gray-500">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex justify-center py-10">
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review._id} className="p-2">
                  <Card>
                    <CardContent className="flex flex-col items-start justify-center p-4">
                      <div className="flex justify-start items-center space-x-1 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                      </div>
                      <h2 className="flex items-center text-lg font-bold mb-2">
                        {review.author}
                        {review.verified && (
                          <FaCircleCheck className="text-green-500 ml-2" />
                        )}
                      </h2>
                      <p className="text-sm">{review.comment}</p>
                      <p className="text-sm text-gray-400 mt-5">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
