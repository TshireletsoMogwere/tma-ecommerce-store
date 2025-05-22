import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]); // Set the first image as default
        }
      });
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
        <div className="flex-1">
          <div className="flex justify-center items-start mb-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-[300px] h-auto object-contain rounded-lg shadow-md"
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3 flex-wrap justify-center">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index}`}
                className={`w-16 h-16 object-cover border-2 rounded-md cursor-pointer ${
                  selectedImage === img ? 'border-orange-500' : 'border-gray-300'
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
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
      { /* Customer Review Section */}
      <div className="customer-reviews-section">
        <div className="customer-reviews-heading">
          <h2 className="heading">Customer Reviews</h2>
        </div>
        <div className="customer-reviews-container">
          { product.reviews.map((review) => (
            <div className="review">
              <div className="review-rating flex">
                {[...Array(5)].map((_, i) => (
                <Star
                  key={ i }
                  className={`
                    w-5 h-5 ${ i < review.rating ? "text-orange-400" : "text-gray-300" }
                  `}
                />
              ))}
              </div>
              <div className="reviewer-details">
                <p className="reviewer-name-and-email">
                  <span className="reviewer-name">{ review.reviewerName }</span>
                  <span className="separator"> - </span>
                  <span className="reviewer-date italic">{new Date(review.date).toDateString()}</span>
                </p>
                <p className="reviewer-email">{ review.reviewerEmail }</p>
              </div>
              <p className="review-comment">{ review.comment }</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
