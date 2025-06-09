import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "../controls/Filter";
import Pagination from "../controls/Pagination";
import "../styles/index.css";
import GetProducts from "../api/products";
import RatingSummary from "../views/RatingSummary";

function CardContainer({ searchTerm }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit")) || 10;
  const page = parseInt(searchParams.get("page")) || 1;
  const skip = (page - 1) * limit;

  const { products, loading, totalProducts } = GetProducts(20, 5);
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [totalProducts, setTotalProducts] = useState(0);
  const categoryParam = searchParams.get("category") || "";

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  //       if (categoryParam) {
  //         url = `https://dummyjson.com/products/category/${categoryParam}?limit=${limit}&skip=${skip}`;
  //       }
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       setProducts(data.products || []);
  //       setTotalProducts(data.total || 0);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [limit, skip, categoryParam]);

  const handleProductListingLimit = (e) => {
    const newLimit = parseInt(e.target.value);
    searchParams.set("limit", newLimit);
    searchParams.set("page", 1); // Reset to page 1
    setSearchParams(searchParams);
  };

  const handleCategorySelect = (category) => {
    searchParams.set("category", category);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = categoryParam
      ? product.category.toLowerCase() === categoryParam.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
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

      <section className="top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </select>
            </div>
            <Filter onCategorySelect={handleCategorySelect} />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => {
              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="group block h-full"
                >
                  <article className="product-card-container bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300 cursor-pointer h-full">
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
                      <h3 className="font-semibold text-orange-600">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {product.category.replace("-", " ")}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-orange-600">
                          R{product.price}
                        </span>

                       <div className="flex items-center border-t border-gray-100 pt-2 relative rating-trigger">
                        <span className="text-yellow-400">★</span>
                        <span className="font-medium text-gray-900 ml-1">{product.rating}</span>

                        {/* Rating popup on hover */}
                        <RatingSummary reviews={product.reviews || []} average={product.rating} />
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
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        ) : null}
      </div>

      <Pagination total={totalProducts} limit={limit} />
    </div>
  );
}

export default CardContainer;
