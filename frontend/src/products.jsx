import React, { useEffect, useState } from 'react';


function Card() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <div className="card-container">
      {products.map(product => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <div className="product-card">
            <img className="card-img" src={product.thumbnail} alt={product.title} />   
            <h3 className="item-name">{product.title} <span className="brand">{product.brand}</span></h3>
            <p className="category">{product.category}</p>
              <div className="price-discount">
              <p className="price">R{product.price} </p>
              <p className='discount'>{product.discountPercentage}% OFF</p>
              </div>
              <p className="rating">⭐{product.rating}  ({product.stock} reviews)</p>
            
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Card;
