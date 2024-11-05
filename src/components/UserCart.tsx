import { useEffect, useState } from "react";
import {
  deleteProductFromCart,
  getClientCart,
  ProductCart,
} from "../services/clientCartService";
import UserCartCard from "./UserCartCard";

export default function UserCart() {
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * Gets the client's cart and sets total price
   */
  const handleGetClientCart = async () => {
    setLoading(true);
    setMessage("");
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an ID.");
        return;
      }
      const response = await getClientCart(clientId);
      const productsInCart = response.data.productsInShoppingCart || []; // Default to empty array if null

      setProducts(productsInCart);
      setTotalPrice(response.data.totalPrice || 0); // Default to 0 if totalPrice is null

      // Set empty cart message if no products
      if (productsInCart.length === 0) {
        setMessage(
          "Your shopping cart is empty. Add some products to continue.",
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while fetching the cart.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a product from the client's cart
   */
  const handleDeleteProductFromCart = async (productName: string) => {
    setMessage("");
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an ID.");
        return;
      }
      const response = await deleteProductFromCart(clientId, { productName });
      setMessage(response.message);

      // Refresh the cart after deletion
      handleGetClientCart();
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while deleting the product.");
    }
  };

  // Fetch the cart on component mount
  useEffect(() => {
    handleGetClientCart();
  }, []);

  return (
    <div className="bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6">
      <div className="px-4 py-6">
        <div className="flex flex-row items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-custom-dark">
            Your Shopping Cart
          </h2>
        </div>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <UserCartCard
            key={product.productName}
            productCart={product}
            onClick={() => handleDeleteProductFromCart(product.productName)}
          />
        ))}
      </div>

      {/* Show message if loading or empty */}
      {loading && <p className="text-custom-dark">Loading...</p>}
      {message && (
        <p className="text-custom-silver text-center mt-4">{message}</p>
      )}

      {/* Total Price */}
      {products.length > 0 && !loading && (
        <div className="mt-6 text-center text-xl font-bold text-custom-dark">
          Total Price: ${totalPrice.toFixed(2)}
        </div>
      )}
    </div>
  );
}
