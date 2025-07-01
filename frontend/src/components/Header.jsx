import { Link } from "react-router-dom";
import Search from './../controls/Search';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

function Header({ setSearchTerm }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch('https://dummyjson.com/carts/4')
      .then(res => res.json())
      .then(data => {
        const totalItems = data.products.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      })
      .catch(err => console.error('Error fetching cart count:', err));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-orange-500">
        e-commerce store
      </Link>

      {/* Search Bar */}
      <Search setSearchTerm={setSearchTerm} />

      {/* Cart Icon */}
      <Link to="/cart" className="relative ml-4">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}

export default Header;
