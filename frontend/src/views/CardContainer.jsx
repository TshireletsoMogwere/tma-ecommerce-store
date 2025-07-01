import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Filter from "../controls/Filter";
import Pagination from "../controls/Pagination";
import { getProducts } from "../api/products";
import RatingSummary from "../popups/RatingSummary";
import Sorting from "../controls/Sorting";
import { filterProductsByStock } from "../helpers/productsHelper";
import { RotateCcw } from "lucide-react";

function CardContainer({ searchTerm }) {
  const [sortConfig, setSortConfig] = useState({ sortBy: "", order: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stockFilter, setStockFilter] = useState("All");

  const limit = parseInt(searchParams.get("limit")) || 30;
  const page = parseInt(searchParams.get("page")) || 1;
  const skip = (page - 1) * limit;
  const categoryParam = searchParams.get("category") || "";

  useEffect(() => {
    setLoading(true);
    getProducts({
      limit,
      skip,
      category: categoryParam,
      sortBy: sortConfig.sortBy,
      order: sortConfig.order,
    })
      .then(({ products, total }) => {
        setProducts(products);
        setTotalProducts(total);
      })
      .catch(() => {
        setProducts([]);
        setTotalProducts(0);
      })
      .finally(() => setLoading(false));
  }, [limit, skip, categoryParam, sortConfig]);

  const handleProductListingLimit = (e) => {
    searchParams.set("limit", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleCategorySelect = (category) => {
    if (category === "") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleSortChange = ({ sortBy, order }) => {
    setSortConfig({ sortBy, order });
  };

  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };

  const handleStockAvailability = (e) => {
    const option = e.target.value;
    setStockFilter(option);
  };

  // Apply search term filtering
  let searchFilteredProducts = products.filter((product) =>
    searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  // Apply stock filter using helper
  const { products: filteredProducts, count: filteredCount } =
    filterProductsByStock(searchFilteredProducts, stockFilter);

  const handleResetFilters = () => {
    setLoading(true);
    setStockFilter("All");
    setSortConfig({ sortBy: "", order: "" });
    searchParams.delete("category");
    searchParams.delete("limit");
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

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
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-2 text-sm font-medium border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>

            {/* Limit Selector */}
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
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={limit}
              >
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </select>
            </div>

            {/* Stock Filter */}
            <div className="flex items-center gap-3">
              <label
                htmlFor="stock-select"
                className="text-sm font-semibold text-gray-700"
              >
                Stock:
              </label>
              <select
                id="stock-select"
                value={stockFilter}
                onChange={handleStockAvailability}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="in stock">In Stock</option>
                <option value="out of stock">Out of Stock</option>
              </select>
            </div>

            <Filter onCategorySelect={handleCategorySelect} />
            <Sorting onSortChange={handleSortChange} currentSort={sortConfig} />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-gray-600 font-medium">
                {stockFilter === "All" ? (
                  <>
                    Showing{" "}
                    <strong className="text-orange-500">
                      {filteredProducts.length}
                    </strong>{" "}
                    of
                    <strong className="text-orange-500">
                      {" "}
                      {totalProducts}
                    </strong>{" "}
                    results
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <strong className="text-orange-500">{filteredCount}</strong>{" "}
                    {stockFilter} products out of
                    <strong className="text-orange-500">
                      {" "}
                      {totalProducts}
                    </strong>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/products/${product.id}`}
                    key={product.id}
                    className="group block h-full "
                  >
                    <article className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300 cursor-pointer h-full">
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
                            <span className="font-medium text-gray-900 ml-1">
                              {product.rating}
                            </span>
                            <RatingSummary
                              reviews={product.reviews || []}
                              average={product.rating}
                            />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 text-sm mt-8">
              No products found for selected filters.
            </p>
          )}
        </div>
      </div>

      <Pagination
        total={totalProducts}
        limit={limit}
        onPageChange={handlePageChange}
        currentPage={page}
      />
    </div>
  );
}

export default CardContainer;
