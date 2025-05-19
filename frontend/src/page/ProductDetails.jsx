import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 font-sans">
      {/* Back Button */}
        <button
      onClick={() => navigate('/')}
      className="flex items-center gap-2 mb-6 tex-white bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded hover:bg-gray-200 transition"
    >
      <ArrowLeft className="w-5 h-5" />
      
    </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-[300px] h-auto object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <h2 className="text-orange-500 text-2xl font-semibold">{product.title}</h2>

          <p className="flex items-center space-x-2">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span>{product.rating}</span>
            <span className="text-gray-500">({product.stock} reviews)</span>
          </p>

          <p>
            <span className="bg-gray-200 px-2 py-1 rounded mr-2 font-semibold">Price:</span>
            <span className="text-lg font-medium">R{product.price}</span>
          </p>

          <div>
            <p className="text-orange-500 font-semibold mt-4">Description:</p>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <p>
            <span className="text-orange-500 font-semibold">Category:</span>{' '}
            <span className="text-gray-700">{product.category}</span>
          </p>

          <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
