"use client";

import { useEffect, useState, useCallback } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
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
  const [activeTab, setActiveTab] = useState("reviews");

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
    <main className="mt-10">
      {/* Tabs */}
      <div className="flex justify-center border-b border-black/10 max-w-screen-xl mx-auto">
        {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => {
          const tabKey = tab === "Rating & Reviews" ? "reviews" : tab.toLowerCase();
          return (
            <button
              key={tab}
              className={`flex-1 text-center py-4 text-sm md:text-base transition-colors ${
                activeTab === tabKey
                  ? "text-black font-medium border-b-2 border-black"
                  : "text-black/60 hover:text-black"
              }`}
              onClick={() => setActiveTab(tabKey)}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">
            All Reviews
            {reviews.length > 0 && (
              <span className="text-sm font-normal text-black/60 ml-2">
                ({reviews.length}) - Avg: {avgRating}/5
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            <button className="hidden md:flex items-center px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm">
              Latest <RiArrowDropDownLine className="ml-1 text-xl" />
            </button>
            <button
              className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "Write a Review"}
            </button>
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
            <p className="text-black/60">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex justify-center py-10">
            <p className="text-black/60">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-black/10 rounded-[20px] p-6 md:p-8"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <h3 className="flex items-center text-xl font-bold mb-3">
                  {review.author}
                  {review.verified && (
                    <FaCircleCheck className="text-green-500 ml-1.5 text-base" />
                  )}
                </h3>
                <p className="text-base text-black/60 leading-[22px]">
                  {review.comment}
                </p>
                <p className="text-sm text-black/40 mt-5">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
