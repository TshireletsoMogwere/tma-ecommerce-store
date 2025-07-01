import { useEffect, useState } from "react";
import PreviewCard from "./PreviewCard";

export default function CartDisplay() {
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/carts/4")
      .then((res) => res.json())
      .then((data) => setCartData(data))
      .catch((err) => console.error("Failed to load cart", err));
  }, []);

  if (!cartData) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Loading cart...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-6 relative">
      {/* Product List */}
      <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cartData.products.map((product) => (
          <PreviewCard key={product.id} product={product} small />
        ))}
      </div>
{/* Cart Summary for Desktop */}
<div className="hidden md:block w-1/3 sticky top-24 h-fit bg-gray-50 shadow-md rounded-xl p-6">
  <h2 className="text-xl font-bold mb-4 text-gray-800">Cart Summary</h2>
  <div className="space-y-2 text-sm text-gray-700">
    <div className="flex justify-between">
      <span>Total:</span>
      <span className="font-semibold text-gray-900">R{cartData.total}</span>
    </div>
    <div className="flex justify-between">
      <span>Discounted Total:</span>
      <span className="font-semibold text-green-600">R{cartData.discountedTotal}</span>
    </div>
    <div className="flex justify-between">
      <span>Total Products:</span>
      <span>{cartData.totalProducts}</span>
    </div>
    <div className="flex justify-between">
      <span>Total Quantity:</span>
      <span>{cartData.totalQuantity}</span>
    </div>
  </div>
  <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition">
    Checkout
  </button>

  {/* Trust Indicators */}
  <div className="mt-4 bg-gray-50 shadow-md rounded-xl p-6">
    <h2 className="text-xl font-bold mb-4 text-gray-800">Why Shop With Us?</h2>
    <ul className="space-y-3 text-gray-700 text-sm">
      <li className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Secure checkout
      </li>
      <li className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Many ways to pay
      </li>
      <li className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Fast, reliable delivery
      </li>
    </ul>
  </div>
</div>

{/* Mobile Fixed Checkout Bar */}
<div className="fixed bottom-0 left-0 right-0 flex md:hidden items-center justify-between bg-white border-t border-gray-200 p-4 shadow-lg z-50">
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">Total</span>
    <span className="font-semibold text-gray-900">R{cartData.total}</span>
  </div>
  <div className="flex flex-col text-right">
    <span className="text-xs text-gray-500">Items</span>
    <span className="text-gray-700">{cartData.totalProducts}</span>
  </div>
  <button className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition">
    Checkout
  </button>
</div>


    </div>
  );
}
