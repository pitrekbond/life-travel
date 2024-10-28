"use client";

import { useState } from "react";

export function StarRating({
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
  readOnly = false,
}) {
  const [rating, setRating] = useState(initialRating);

  const handleRating = function (newRating) {
    if (readOnly) return;

    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxStars }, (_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleRating(index + 1)}
          // readOnly={readOnly}
        />
      ))}
    </div>
  );
}

function Star({ filled, onClick, readOnly }) {
  return (
    <span
      className={`cursor-pointer text-2xl ${
        filled ? "text-accent-400" : "text-gray-400"
      }`}
      onClick={onClick}
    >
      ★
    </span>
  );
}
