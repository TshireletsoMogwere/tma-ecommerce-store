import ProductDetail from "../api/ProductDetails.js";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import RatingSummary from "../views/RatingSummary";


export default function ProductDetails() {
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    ProductDetail.getProductDetail(id)
      .then((data) => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
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
<div className="relative w-[300px] h-auto mb-4 mx-auto">
  <img
    src={selectedImage}
    alt={product.title}
    className="w-full h-auto object-contain rounded-xl shadow-md border"
  />

  {/* Icon directly on top of image */}
  <button
    onClick={() => {
      setCurrentImageIndex(product.images.indexOf(selectedImage));
      setIsModalOpen(true);
    }}
    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow hover:scale-110 transition z-10"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14m-6 0l-4.553 2.276A2 2 0 012 14.382V9.618a2 2 0 012.447-1.894L9 10m6 4V6m-6 8V6"
      />
    </svg>
  </button>
</div>

{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
    <div className="relative max-w-3xl w-full px-4">
      <button
        className="absolute top-4 right-8 text-black text-2xl"
        onClick={() => setIsModalOpen(false)}
      >
        &times;
      </button>

      <img
        src={product.images[currentImageIndex]}
        alt="Full view"
        className="w-full h-auto max-h-[80vh] object-contain mx-auto bg-white rounded-lg"
      />

{product.images.length > 1 && (
  <>
    <button
      className="absolute left-8 top-1/2 -translate-y-1/2 text-black text-3xl"
      onClick={() =>
        setCurrentImageIndex(
          (currentImageIndex - 1 + product.images.length) % product.images.length
        )
      }
    >
      &#8592;
    </button>

    <button
      className="absolute right-8 top-1/2 -translate-y-1/2 text-black text-3xl"
      onClick={() =>
        setCurrentImageIndex((currentImageIndex + 1) % product.images.length)
      }
    >
      &#8594;
    </button>
  </>
)}

    </div>
  </div>
)}

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
             <a href="#all-reviews"><span className="ml-1">{product.rating}</span></a>
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
          <p>
            <span className="text-gray-500 bg-gray-100 p-1 rounded shadow-sm">
              {product.tags.join(", ")}
            </span>

          </p>
          <button className="mt-4 bg-orange-500 text-white px-5 py-2 rounded shadow hover:bg-orange-600 transition">
            Add to Cart
          </button>
        </div>
      </div>
      {/* Customer Reviews */}
      <div className="mt-12 p-6 rounded-lg shadow-s" id="all-reviews">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        </div>

     {/* Ratings Summary */}
        <div className="rating-summary-inline"> 
           <RatingSummary reviews={product.reviews || []} average={product.rating} /> 
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