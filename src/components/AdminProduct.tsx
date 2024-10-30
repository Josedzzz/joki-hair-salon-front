import { useEffect, useState } from "react";
import { getAllProducts, Product } from "../services/adminProductService";
import AdminProductInfo from "./AdminProductInfo";
import AdminProductCard from "./AdminProductCard";

export default function AdminProduct() {
  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * manage the states to add product
   */
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsAddingNewProduct(true);
  };

  /**
   * manage the states to select a product
   * @param product
   */
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsAddingNewProduct(false);
  };

  /**
   * get all the products paginated
   * @param page the page to display
   */
  const handleGetAllProducts = async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await getAllProducts(page);
      setProductsToDisplay(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handle next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handleGetAllProducts(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetAllProducts(currentPage - 1);
    }
  };

  // fetch products when page restart
  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6 ">
      {!selectedProduct && !isAddingNewProduct ? (
        <div className="px-4 py-6">
          <div className="flex flex-row items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-custom-dark">
              Manage Products
            </h2>
            <button
              className="w-50px text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleAddProduct}
            >
              <i className="fa-solid fa-plus"></i> Add a new Product
            </button>
          </div>

          <div className="mb-4 flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={loading || currentPage === 0}
              className={`w-50px text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-custom-dark hover:text-custom-white"
              }`}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={handleNextPage}
              disabled={loading || currentPage >= totalPages - 1}
              className={`w-50px text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
                currentPage >= totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-custom-dark hover:text-custom-white"
              }`}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productsToDisplay.map((product) => (
              <AdminProductCard
                key={product.productId}
                product={product}
                onClick={() => handleSelectProduct(product)}
              />
            ))}
          </div>
          {loading && <p className="text-custom-dark">Loading...</p>}
        </div>
      ) : (
        <AdminProductInfo
          product={selectedProduct}
          onBack={async () => {
            setSelectedProduct(null);
            setIsAddingNewProduct(false);
            await handleGetAllProducts(currentPage);
          }}
        />
      )}
    </div>
  );
}
