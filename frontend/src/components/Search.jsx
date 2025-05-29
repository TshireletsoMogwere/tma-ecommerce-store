import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, X, Search as SearchIcon } from "lucide-react";

function Search({ searchTerm = "", setSearchTerm }) {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Handle search on Enter key
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  // Handle search button click
  const performSearch = () => {
    const trimmedTerm = searchTerm.trim();
    const params = new URLSearchParams();
    
    if (trimmedTerm) {
      params.set("search", trimmedTerm);
    }
    
    if (priceRange.min) {
      params.set("minPrice", priceRange.min);
    }
    
    if (priceRange.max) {
      params.set("maxPrice", priceRange.max);
    }
    
    const queryString = params.toString();
    navigate(queryString ? `/products?${queryString}` : "/products");
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    navigate("/products");
  };

  // Handle price range input
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-500">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-lg"
          />
        </div>
        
        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-4 transition-colors duration-200 ${
            showFilters || priceRange.min || priceRange.max
              ? "bg-blue-500 text-white"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
        
        {/* Search Button */}
        <button
          onClick={performSearch}
          className="px-6 py-4 bg-blue-500 text-white font-medium transition-colors duration-200 hover:bg-blue-600 active:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-10 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Price Range Filter */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Min price"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange("min", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <span className="text-gray-400 font-medium">to</span>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Max price"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange("max", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
            
            {/* Quick Price Range Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Select
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Under $25", min: "", max: "25" },
                  { label: "$25-$50", min: "25", max: "50" },
                  { label: "$50-$100", min: "50", max: "100" },
                  { label: "$100-$200", min: "100", max: "200" },
                  { label: "Over $200", min: "200", max: "" }
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setPriceRange({ min: range.min, max: range.max })}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      priceRange.min === range.min && priceRange.max === range.max
                        ? "bg-blue-500 text-white border-blue-500"
                        : "text-gray-600 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Filter Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  performSearch();
                  setShowFilters(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(searchTerm.trim() || priceRange.min || priceRange.max) && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-sm text-gray-500">Active filters:</span>
          {searchTerm.trim() && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Search: "{searchTerm.trim()}"
              <button
                onClick={() => setSearchTerm("")}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(priceRange.min || priceRange.max) && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Price: ${priceRange.min || "0"} - ${priceRange.max || "∞"}
              <button
                onClick={() => setPriceRange({ min: "", max: "" })}
                className="hover:bg-green-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;