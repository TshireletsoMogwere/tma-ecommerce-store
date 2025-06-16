'use strict';

const ProductDetail = {
  async getProductDetail(productId) {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const product = await response.json();
      return product;
    }
    catch (error) {
      console.error('Error fetching product detail:', error);
      throw error;
    }
  }
};

export default ProductDetail;
