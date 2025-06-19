import { useState, useEffect } from 'react';
import { filterByPriceRange } from '../api/filterByPriceRange';

type Product = {
  id: string | number;
  title: string;
  price: number;
};

type ProductFilterProps = {
  products?: Product[]; // Make products optional in case it's not ready initially
};

export default function ProductFilter({ products = [] }: ProductFilterProps) {
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    if (products.length > 0) {
      setFiltered(products); // Set filtered only if products is available
    }
  }, [products]);

  const handleFilter = () => {
    const result = filterByPriceRange(products, minPrice, maxPrice);
    setFiltered(result);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product Price Range Filter</h1>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border p-2"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

    </div>
  );
}
