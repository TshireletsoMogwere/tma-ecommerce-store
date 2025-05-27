import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CardContainer({ searchTerm, selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

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
