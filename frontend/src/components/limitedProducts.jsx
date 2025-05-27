import React, { useEffect, useState } from 'react';

const LimitedProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
            // setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            // setLoading(false);
        });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
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
            {products.map((product) => (
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
            ))}
        </div>
    </section>
  );
};

export default LimitedProductsList;