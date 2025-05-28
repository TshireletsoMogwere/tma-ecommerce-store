import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]); 
        }
      });
  }, [id]);

  if (!product) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Loading product details...
      </p>
    );
  }

  return (
    <div className="max-w-10xl mx-auto p-6 font-sans">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-6 text-white bg-orange-500 hover:bg-orange-600 transition px-4 py-2 rounded shadow"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-1">
          <div className="flex justify-center items-start mb-4">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-[300px] h-auto object-contain rounded-xl shadow-md border"
            />
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index}`}
                className={`w-16 h-16 object-cover border-2 rounded-md cursor-pointer ${
                  selectedImage === img
                    ? "border-orange-500"
                    : "border-gray-300"
                } hover:scale-105 transition`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>

          <p className="flex items-center space-x-2 text-gray-600">
            <span className="flex items-center text-orange-500">
              <Star className="w-5 h-5" />
              <span className="ml-1">{product.rating}</span>
            </span>
            <span className="text-gray-400">•</span>
            <span>{product.stock} in stock</span>
          </p>

          <p className="text-lg">
            <span className="font-semibold text-gray-700">Price:</span>{" "}
            <span className="text-orange-500 font-bold">R{product.price}</span>
          </p>

          <div>
            <p className="font-semibold text-gray-700">Description:</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <p>
            <span className="font-semibold text-gray-700">Category:</span>{" "}
            <span className="text-orange-500">{product.category}</span>
          </p>

          <button className="mt-4 bg-orange-500 text-white px-5 py-2 rounded shadow hover:bg-orange-600 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-12 p-6 rounded-lg shadow-s">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        </div>

        <div className="space-y-6">
          {product.reviews?.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-5 rounded-lg shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "text-orange-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="text-sm text-gray-600 mb-1">
                <p className="flex items-center gap-1">
                  <span className="font-medium text-gray-800">
                    {review.reviewerName}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="italic">
                    {new Date(review.date).toDateString()}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{review.reviewerEmail}</p>
              </div>

              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
