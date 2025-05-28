import React, { useEffect, useState } from "react";

function Filter({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  function handleChange(e) {
    const category = e.target.value;
    setSelected(category);
    onCategorySelect(category); 
  }

  return (
    <div className="filter">
      <select value={selected} onChange={handleChange}>
        <option value="">All Categories</option>
        {categories.map((cat) => {
          const catName = typeof cat === "string" ? cat : cat.name || "";
          return (
            <option key={catName} value={catName}>
              {catName.charAt(0).toUpperCase() + catName.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filter;
