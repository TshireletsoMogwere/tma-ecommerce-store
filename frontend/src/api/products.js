import {useState, useEffect} from 'react'

function GetProducts(limit=10, skip=1, categoryParam) {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [totalProducts, setTotalProducts] = useState(0);

   useEffect(() => {
     const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        if (categoryParam) {
          url = `https://dummyjson.com/products/category/${categoryParam}?limit=${limit}&skip=${skip}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
        setTotalProducts(data.total || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
}, [limit, skip, categoryParam]);

    return { products, loading, totalProducts };
}

const URLParamTypes = {
    LIMIT: "limit",
    SKIP: "skip",
    CATEGORYPARAM: "categoryParam"
}

export default GetProducts