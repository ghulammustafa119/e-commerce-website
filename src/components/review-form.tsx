"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!author.trim() || !comment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, author, rating, comment }),
      });

      if (res.ok) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setAuthor("");
        setComment("");
        onReviewSubmitted();
      } else {
        toast.error("Failed to submit review");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-[16px] p-6 space-y-4">
      <h3 className="font-bold text-lg">Write a Review</h3>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-2xl transition-colors"
            >
              <FaStar
                className={
                  star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Author */}
      <div>
        <label htmlFor="review-author" className="block text-sm font-medium mb-1">Your Name</label>
        <input
          id="review-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          placeholder="John Doe"
          required
        />
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium mb-1">Your Review</label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          placeholder="Share your experience with this product..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-6 py-2 rounded-full disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
