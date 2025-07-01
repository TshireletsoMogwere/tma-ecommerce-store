// components/PreviewCard.jsx
import { useNavigate } from "react-router-dom";

export default function PreviewCard({ product, small = false }) {
  const navigate = useNavigate();

  return (
    <div
      className={`border rounded-lg p-3 shadow hover:shadow-md cursor-pointer transition ${
        small ? "text-sm" : ""
      }`}
      onClick={() => navigate(`/products/${product.id}`)}
    >  
      <img
        src={product.thumbnail}
        alt={product.title}
        className={`w-full ${small ? "h-38" : "h-40"} object-cover rounded mb-2`}
      />
      <h3 className="font-bold text-gray-800 truncate">{product.title}</h3>
      <p className="text-orange-500 font-semibold">R{product.price}</p>
      <p className="text-gray-600">{product.quantity} item(s)</p>
    </div>
  );
}
