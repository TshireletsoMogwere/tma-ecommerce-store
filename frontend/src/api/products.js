
let cachedProducts = null;
let cachedTotal = 0;

export async function getProducts({ limit = 30, skip = 0, category = "", sortBy = "", order = "" }) {
  // Cache only for default query (no category, skip = 0, limit = 30, no sort)
  const isDefaultQuery = !category && skip === 0 && limit === 30 && !sortBy && !order;
  if (cachedProducts && isDefaultQuery) {
    return { products: cachedProducts, total: cachedTotal };
  }

  try {
    let url = "";

    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    }

    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    // Cache the response for default queries only
    if (isDefaultQuery) {
      cachedProducts = data.products;
      cachedTotal = data.total;
    }

    return {
      products: data.products || [],
      total: data.total || 0,
    };
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return {
      products: [],
      total: 0,
    };
  }
}

