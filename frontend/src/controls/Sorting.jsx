import React, { useState } from "react";
import "../styles/Sorting.css";

function Sorting({ onSortChange, currentSort }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const [sortBy, order] = e.target.value.split(",");
    onSortChange({ sortBy, order });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <aside className={`sorting-container ${isVisible ? "" : "collapsed"}`}>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? "✕" : "☰"}
      </button>

      {isVisible && (
        <>
          <h3 className="sorting-title">SORT</h3>
          <select
            className="sorting-select"
            onChange={handleChange}
            value={`${currentSort.sortBy},${currentSort.order}`}
          >
            <option value="relevance,asc">Relevance</option>
            <option value="title,asc">Title A → Z</option>
            <option value="title,desc">Title Z → A</option>
            <option value="price,asc">Price Low → High</option>
            <option value="price,desc">Price High → Low</option>
            <option value="rating,desc">Top Rated</option>
            <option value="rating,asc">Lowest Rated</option>
          </select>
        </>
      )}
    </aside>
  );
}

export default Sorting;
