import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Search({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  // When user presses Enter, navigate to products with search query param
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmedTerm = searchTerm.trim();
      navigate(
        trimmedTerm
          ? `/products?search=${encodeURIComponent(trimmedTerm)}`
          : "/products"
      );
    }
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleSearch}
      style={{
        padding: "8px",
        width: "250px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        textAlign: "center",
      }}
    />
  );
}

export default Search;
