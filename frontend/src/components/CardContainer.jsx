import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CardContainer({ searchTerm, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductListingLimit = (event) => {
    let selectedLimit = event.target.value;
    setLoading(true);
    fetch(`https://dummyjson.com/products?limit=${selectedLimit}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((data) => {
          setProducts(data.products);
      })
      .catch((error) => {
          setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      }
    )
  };

  // Apply search and category filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  // Generate dropdown options from 1 to 30
  const dropdownOptions = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div>
      {loading && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="flex flex-col items-center gap-2">
      <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <p className="text-orange-500 font-semibold text-lg">Loading products...</p>
    </div>
  </div>
)}

  <section className="flex justify-center items-center p-4">
  <section className="flex items-center gap-2 text-gray-800 text-base">
    <label htmlFor="product-listing-limit-option" className="font-semibold">Products:</label>
    <select
      id="product-listing-limit-option"
      onChange={handleProductListingLimit}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition text-gray-700"
    >
      <option className="hover:bg-orange-200">30</option>
      <option className="hover:bg-orange-200">20</option>
      <option className="hover:bg-orange-200">10</option>
      <option className="hover:bg-orange-200">5</option>
    </select>
  </section>
</section>

        <div className="card-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/products/${product.id}`} key={product.id}>
                <div className="product-card">
                  <img className="card-img" src={product.thumbnail} alt={product.title} />
                  <h3 className="item-name">
                    {product.title} <span className="brand">{product.brand}</span>
                  </h3>
                  <p className="category">{product.category}</p>
                  <div className="price-discount">
                    <p className="price">R{product.price}</p>
                    <p className="discount">{product.discountPercentage}% OFF</p>
                  </div>
                  <p className="rating">
                    ⭐{product.rating} ({product.stock} reviews)
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p style={{ padding: '20px', color: 'orange' }}>Loading</p>
          )}
        </div>
        
    </div>
    
  );
}

export default CardContainer;
