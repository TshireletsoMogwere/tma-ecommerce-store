// utils/filterByPriceRange.js
export function filterByPriceRange(products, minPrice, maxPrice) {
  console.log(`Filtering products by price range: ${minPrice} - ${maxPrice}`);
  console.log(`Total products before filtering: ${products.length}`);

  const filtered = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  console.log(`Total products after filtering: ${filtered.length}`);

  return filtered;
}
