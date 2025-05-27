import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Card({ searchTerm, selectedCategory }) {
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
      });
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

      <section className="product-listing-container">
        <section className="product-listing-limit-container">
            <label htmlFor="product-listing-limit-option">Products:</label>
            <select id="product-listing-limit-option" onChange={handleProductListingLimit}>
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
                <option value="5">5</option>
            </select>
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
      </section>
    </div>
  );
}

export default Card;
