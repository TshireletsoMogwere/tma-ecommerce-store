import React, { useEffect, useState } from "react";
import { getCategoryList } from "../api/categories";

function Filter({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoryList().then((data) => {
      // checks if it is an array and all values are strings
      const filtered = Array.isArray(data)
        ? data.filter((cat) => typeof cat === "string")
        : [];
      setCategories(filtered);
    });
  }, []);

  const handleChange = (e) => {
    onCategorySelect(e.target.value);
  };

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="category-filter"
        className="font-semibold text-gray-700 text-sm"
      >
        Category:
      </label>
      <select
        id="category-filter"
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
