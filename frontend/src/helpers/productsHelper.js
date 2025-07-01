export const filterProductsByStock = (products, stockFilter) => {
    const totalProducts = products.length; //counts how many products
    let filteredProducts = products; //stores filtered products

    if (stockFilter === "out of stock") {
        filteredProducts = products.filter(product => product.stock === 0);
    } else if (stockFilter === "in stock") {
        filteredProducts = products.filter(product => product.stock > 0);
    }

    //returns the total number of products returned when filtered
    return {
        total: totalProducts,
        count: filteredProducts.length,
        products: filteredProducts
    };
};
