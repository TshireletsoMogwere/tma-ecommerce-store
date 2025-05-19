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
        <div className="product-card" key={product.id}>
          <img className="card-img" src={product.thumbnail} alt={product.title} />
          <h3 className="item-name">{product.title}</h3>
          <p className="card-details">{product.description}</p>
          <p className="price">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
