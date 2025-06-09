// src/components/RatingSummary.jsx
import React from "react";
import "../styles/index.css";

function RatingSummary({ reviews = [], average }) {
  const getRatingDistribution = (reviews) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, total: reviews.length };
    reviews.forEach((review) => {
      const rating = Math.round(review.rating);
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    });
    return distribution;
  };

  const distribution = getRatingDistribution(reviews);
  const maxRating = Math.max(...Object.values(distribution).slice(0, 5), 1);

  return (
    <div className="rating-popup">
      <div className="rating-popup-content">
        <div className="rating-summary">
          <div className="rating-total">{average?.toFixed(1)}</div>
          <div className="rating-count">{distribution.total} reviews</div>
          <button className="view-all-btn">View all</button>
        </div>
        <div className="rating-stats">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-row">
              <div className="rating-label">{star}star</div>
              <div className="rating-bar-container">
                <div
                  className="rating-bar"
                  style={{ width: `${(distribution[star] / maxRating) * 100}%` }}
                ></div>
              </div>
              <div className="rating-value">{distribution[star]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RatingSummary;
