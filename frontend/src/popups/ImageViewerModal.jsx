import React from "react";

export default function ImageModalViewer({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  onClose,
}) {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="relative max-w-3xl w-full px-4">
        <button
          className="absolute top-4 right-8 text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          src={images[currentImageIndex]}
          alt="Full view"
          className="w-full h-auto max-h-[80vh] object-contain mx-auto bg-white rounded-lg"
        />

        {images.length > 1 && (
          <>
            <button
              className="absolute left-8 top-1/2 -translate-y-1/2 text-black text-3xl"
              onClick={() =>
                setCurrentImageIndex(
                  (currentImageIndex - 1 + images.length) % images.length
                )
              }
            >
              &#8592;
            </button>

            <button
              className="absolute right-8 top-1/2 -translate-y-1/2 text-black text-3xl"
              onClick={() =>
                setCurrentImageIndex((currentImageIndex + 1) % images.length)
              }
            >
              &#8594;
            </button>
          </>
        )}
      </div>
    </div>
  );
}
