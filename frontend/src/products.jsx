import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Card({ searchTerm, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="card-container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
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
        <p style={{ padding: '20px', color: 'red' }}>No products found.</p>
      )}
    </div>
  );
}

export default Card;
