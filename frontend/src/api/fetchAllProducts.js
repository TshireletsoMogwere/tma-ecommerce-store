// services/fetchAllProducts.js
export async function fetchAllProducts() {
  const allProducts = [];
  let skip = 0;
  const limit = 100; // maximum supported by dummyjson is 100

  while (true) {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await res.json();

    allProducts.push(...data.products);

    if (allProducts.length >= data.total) {
      break;
    }

    skip += limit;
  }

  console.log(`Fetched ${allProducts.length} products from the API.`);

  return allProducts;
}
