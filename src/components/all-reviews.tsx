"use client";

import { useEffect, useState, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
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
  productDescription?: string;
}

type SortOption = "latest" | "oldest" | "highest" | "lowest";

export default function CustomerReviews({ productId, productDescription }: AllReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [showSortMenu, setShowSortMenu] = useState(false);

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

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const sortLabels: Record<SortOption, string> = {
    latest: "Latest",
    oldest: "Oldest",
    highest: "Highest Rating",
    lowest: "Lowest Rating",
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <main className="mt-10">
      {/* Tabs */}
      <div className="flex justify-center border-b border-black/10 max-w-screen-xl mx-auto">
        {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => {
          const tabKey = tab === "Rating & Reviews" ? "reviews" : tab === "Product Details" ? "details" : "faqs";
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
        {/* Product Details Tab */}
        {activeTab === "details" && (
          <div className="py-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Product Details</h2>
            {productDescription ? (
              <p className="text-base text-black/60 leading-7">{productDescription}</p>
            ) : (
              <p className="text-black/60">No product details available.</p>
            )}
            <div className="mt-6 space-y-3">
              <div className="flex gap-2">
                <span className="font-medium">Material:</span>
                <span className="text-black/60">Premium quality fabric</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Care:</span>
                <span className="text-black/60">Machine wash cold, tumble dry low</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Fit:</span>
                <span className="text-black/60">Regular fit, true to size</span>
              </div>
            </div>
          </div>
        )}

        {/* FAQs Tab */}
        {activeTab === "faqs" && (
          <div className="py-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "What is the return policy?", a: "We offer a 30-day return policy. Items must be in original condition with tags attached." },
                { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days." },
                { q: "Is this product true to size?", a: "Yes, our products are true to size. We recommend checking the size guide for exact measurements." },
                { q: "How do I care for this product?", a: "Machine wash cold with similar colors. Tumble dry on low heat. Do not bleach or iron directly on prints." },
              ].map((faq, i) => (
                <div key={i} className="border border-black/10 rounded-[16px] p-5">
                  <h3 className="font-bold text-base mb-2">{faq.q}</h3>
                  <p className="text-black/60 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <>
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
                {/* Sort Dropdown */}
                <div className="relative hidden md:block">
                  <button
                    className="flex items-center px-4 py-2.5 bg-[#F0F0F0] rounded-full text-sm"
                    onClick={() => setShowSortMenu(!showSortMenu)}
                  >
                    {sortLabels[sortBy]}
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  {showSortMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-black/10 rounded-[12px] shadow-lg z-10 py-1 min-w-[160px]">
                      {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                        <button
                          key={option}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F0F0F0] transition-colors ${
                            sortBy === option ? "font-medium text-black" : "text-black/60"
                          }`}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortMenu(false);
                          }}
                        >
                          {sortLabels[option]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
                {sortedReviews.map((review) => (
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
          </>
        )}
      </div>
    </main>
  );
}
