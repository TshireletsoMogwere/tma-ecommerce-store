import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "./Filter";
import "../styles/index.css"; // Import the new CSS file




function CardContainer({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle limit selection
  const handleProductListingLimit = (event) => {
    const selectedLimit = event.target.value;
    setLoading(true);
    fetch(
      `https://dummyjson.com/products${
        selectedLimit ? `?limit=${selectedLimit}` : ""
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Generate mock rating distribution (since dummyjson doesn't provide this)
  const generateRatingDistribution = (rating) => {
    const baseRatings = {
      5: Math.floor(rating * 20),
      4: Math.floor(rating * 15),
      3: Math.floor(rating * 10),
      2: Math.floor(rating * 5),
      1: Math.floor(rating * 2)
    };
    
    // Normalize to make sure total makes sense
    const total = Object.values(baseRatings).reduce((sum, val) => sum + val, 0);
    const multiplier = (rating * 20) / total;
    
    return {
      5: Math.round(baseRatings[5] * multiplier),
      4: Math.round(baseRatings[4] * multiplier),
      3: Math.round(baseRatings[3] * multiplier),
      2: Math.round(baseRatings[2] * multiplier),
      1: Math.round(baseRatings[1] * multiplier),
      total: Math.round(rating * 20)
    };
  };

  // Filter products by search & category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center gap-3">
            <svg
              className="animate-spin h-10 w-10 text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-gray-700 font-medium">Loading products...</p>
          </div>
        </div>
      )}

      {/* Filter Controls Section */}
      <section className="top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Product Limit Dropdown */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="product-limit"
                className="font-semibold text-gray-700 text-sm"
              >
                Products:
              </label>
              <select
                id="product-limit"
                onChange={handleProductListingLimit}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              >
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </select>
            </div>

            {/* Category Filter */}
            <Filter onCategorySelect={setSelectedCategory} />
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => {
              const ratingDistribution = generateRatingDistribution(product.rating);
              const maxRatingCount = Math.max(...Object.values(ratingDistribution));
              
              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="group block h-full"
                >
                  <article className="product-card-container bg-white rounded-lg shadow-sm border border-gray-200 overflow-visible hover:shadow-lg hover:border-orange-300 transition-all duration-300 cursor-pointer h-full">
                    <div className="relative overflow-hidden bg-gray-50">
                      <img
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                      />
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-200 text-gray-500 text-xs font-semibold px-2 py-1 rounded-full">
                            {product.discountPercentage}% OFF
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3 flex-1">
                      {product.brand && (
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {product.brand}
                        </span>
                      )}
                      <h3 className="font-semibold text-orange-600 leading-tight group-hover:text-orange-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {product.category.replace("-", " ")}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-orange-600">
                          R{product.price}
                        </span>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-2 relative">
                        <div className="flex items-center rating-trigger">
                          <span className="text-yellow-400">★</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {product.rating}
                          </span>
                        </div>

                          {/* Rating Popup */}
                          <div className="rating-popup">
                            <div className="rating-popup-content">
                              <div className="rating-summary">
                                <div className="rating-total">{product.rating}</div>
                                <div className="rating-count">{ratingDistribution.total} reviews</div>
                                <button className="view-all-btn">View all</button>
                              </div>
                              <div className="rating-stats">
                                {[5, 4, 3, 2, 1].map((star) => (
                                  <div key={star} className="rating-row">
                                    <div className="rating-label">{star} star</div>
                                    <div className="rating-bar-container">
                                      <div 
                                        className="rating-bar" 
                                        style={{ width: `${(ratingDistribution[star] / maxRatingCount) * 100}%` }}
                                      />
                                    </div>
                                    <div className="rating-value">{ratingDistribution[star]}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : searchTerm ? ( 
          <p className="text-center text-gray-500 text-sm mt-8">
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default CardContainer;