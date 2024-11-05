import { useState } from "react";
import { Product } from "../services/clientProductService";
import { addProductToCart } from "../services/clientCartService";

interface UserProductInfoProps {
  product: Product | null;
  onBack: () => void;
}

enum Categories {
  HAIR_CARE = "Hair care",
  STYLING = "Styling",
  TREATMENT = "Treatment",
  COLOR = "Color",
  TOOLS = "Tools",
  MEN_CARE = "Men care",
  ACCESSORIES = "Accessories",
  KITS = "Kits",
  CHILDREN_CARE = "Children care",
  SKIN_CARE = "Skin care",
  OTHER = "Other",
}

export default function UserProductInfo({
  product,
  onBack,
}: UserProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  /**
   * Adds a product to the client's cart
   */
  const handleAddProductToCart = async () => {
    setMessage("");
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an ID.");
        return;
      }
      if (!product?.productId) {
        setMessage("The product doesn't have an ID.");
        return;
      }
      const response = await addProductToCart(clientId, {
        productId: product?.productId,
        quantity: quantity,
      });
      setMessage(response.message);
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while adding the product.");
    }
  };

  return (
    <div className="bg-custom-platinum rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out mb-4 transform hover:scale-105"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>

      <h2 className="text-xl font-bold text-custom-dark mb-4">
        Product Information
      </h2>

      {product?.images[0] && (
        <div className="mb-6">
          <img
            src={product.images[0]}
            alt="Product"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Product Name</label>
          <p className="bg-custom-white text-custom-dark px-3 py-2 rounded-lg">
            {product?.name}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Description</label>
          <p className="bg-custom-white text-custom-dark px-3 py-2 rounded-lg">
            {product?.description}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Price</label>
          <p className="bg-custom-white text-custom-dark px-3 py-2 rounded-lg">
            ${product?.price}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Stock Quantity</label>
          <p className="bg-custom-white text-custom-dark px-3 py-2 rounded-lg">
            {product?.stockQuantity}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Categories</label>
          <p className="bg-custom-white text-custom-dark px-3 py-2 rounded-lg">
            {product?.categories
              .map(
                (category) => Categories[category as keyof typeof Categories],
              )
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Brand</label>
          <p className="bg-custom-white text-custom-dark px-3 py-2 rounded-lg">
            {product?.brand}
          </p>
        </div>
      </div>

      {/* Input for quantity */}
      <div className="mt-6">
        <label className="block text-custom-dark mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          max={product?.stockQuantity || 1} // Set max to available stock
          className="w-24 bg-custom-white text-custom-dark px-3 py-2 rounded-lg border border-custom-dark"
        />

        {/* Button to add to cart */}
        <button
          onClick={handleAddProductToCart}
          className="ml-6 text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
        >
          <i className="fa-solid fa-cart-plus mr-1"></i> Add to Cart
        </button>
      </div>

      {/* Message display */}
      {message && (
        <p className="text-custom-silver text-center mt-4">{message}</p>
      )}
    </div>
  );
}
