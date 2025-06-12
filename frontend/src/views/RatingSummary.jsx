import React from "react";
import "../styles/index.css";

export default function RatingSummary({ reviews = [], average = 0, mode = "popup" }) {
  const total = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = total ? (count / total) * 100 : 0;
    return { star, count, percentage: Math.round(percentage) };
  });

  return (
    <div
      className={`rating-popup ${
        mode === "inline" ? "visible-inline" : ""
      }`}
    >
      <div className="rating-popup-content">
        <div className="rating-summary">
          <div className="rating-total">{average.toFixed(1)}</div>
          <div className="rating-count">{total} reviews</div>
          <button className="view-all-btn">View all</button>
        </div>

        <div className="rating-stats">
          {ratingCounts.map(({ star, count, percentage }) => (
            <div className="rating-row" key={star}>
              <div className="rating-label">{star} stars</div>
              <div className="rating-bar-container">
                <div
                  className="rating-bar"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="rating-value">{percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
