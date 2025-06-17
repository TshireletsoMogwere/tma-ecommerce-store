let cachedCategories = null;
let cachedCategoryList = null;

export async function getCategories() {
  if (cachedCategories) {
    return cachedCategories;
  }
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    cachedCategories = data;
    return cachedCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryList() {
  if (cachedCategoryList) {
    return cachedCategoryList;
  }
  try {
    const res = await fetch("https://dummyjson.com/products/category-list");
    const data = await res.json();
    cachedCategoryList = data;
    return cachedCategoryList;
  } catch (error) {
    console.error("Error fetching category list:", error);
    return [];
  }
}
