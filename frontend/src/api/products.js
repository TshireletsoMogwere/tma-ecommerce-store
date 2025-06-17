let cachedProducts = null;
let cachedTotal = 0;

export async function getProducts(limit = 10, skip = 0, category = "") {
  // If cached and category & pagination same, return cache
  if (cachedProducts && !category && skip === 0 && limit === 10) {
    return { products: cachedProducts, total: cachedTotal };
  }

  try {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    // cache only if no category and default skip & limit 
    if (!category && skip === 0 && limit === 10) {
      cachedProducts = data.products;
      cachedTotal = data.total;
    }

    return { products: data.products || [], total: data.total || 0 };
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return { products: [], total: 0 };
  }
}
