import { useState } from "react";
import {
  createProduct,
  deleteProduct,
  Product,
  updateProduct,
} from "../services/adminProductService";

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

// Props interface for the component
interface AdminProductInfoProps {
  product: Product | null;
  onBack: () => void;
}

export default function AdminProductInfo({
  product,
  onBack,
}: AdminProductInfoProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [stockQuantity, setStockQuantity] = useState(
    product?.stockQuantity || 0,
  );
  const initialCategories =
    product?.categories.map(
      (category) => Categories[category as keyof typeof Categories],
    ) || [];
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [brand, setBrand] = useState(product?.brand || "");
  const [images, setImages] = useState(product?.images || [""]);
  const [message, setMesssage] = useState("");

  /**
   * validates that the product name is at least 3 chars
   * @param name the name of the product
   * @returns the boolean response
   */
  const validateName = (name: string) => {
    return name.length >= 3;
  };

  /**
   * validates that the product description is at least 10 chars
   * @param description the description of the product
   * @returns the boolean response
   */
  const validateDescription = (description: string) => {
    return description.length >= 10;
  };

  /**
   * validates that the product price is greater than 0
   * @param price the price of the product
   * @returns the boolean response
   */
  const validatePrice = (price: number) => {
    return price > 0;
  };

  /**
   * validates that the product quantity is greater or equal than 0
   * @param quantity the quantity of the product
   * @returns the boolean response
   */
  const validateStockQuantity = (quantity: number) => {
    return quantity >= 0;
  };

  /**
   * validate that the product at least has one category
   * @param categories the categories of the product
   * @returns the boolean response
   */
  const validateCategories = (categories: string[]) => {
    return categories.length >= 1;
  };

  /**
   * validate that the product brand at least has 3 chars
   * @param brand the brand of the product
   * @returns the boolean response
   */
  const validateBrand = (brand: string) => {
    return brand.length >= 3;
  };

  /**
   * validate that the product at least has one image
   * @param categories the images of the product
   * @returns the boolean response
   */
  const validateImages = (images: string[]) => {
    return images.length >= 1;
  };

  /**
   * Handles the submission for the create product form
   */
  const handleCreateProduct = async () => {
    setMesssage("");

    // validate the data before sending the form
    if (!validateName(name)) {
      setMesssage("The product name must be at least 3 characters long");
      return;
    }
    if (!validateDescription(description)) {
      setMesssage(
        "The product description must be at least 10 characters long",
      );
      return;
    }
    if (!validatePrice(price)) {
      setMesssage("The product price must be greater than 0");
      return;
    }
    if (!validateStockQuantity(stockQuantity)) {
      setMesssage("The product quantity must be 0 or greater");
      return;
    }
    if (!validateCategories(categories)) {
      setMesssage("The product must have at least one category");
      return;
    }
    if (!validateBrand(brand)) {
      setMesssage("The product brand must be at least 3 characters long");
      return;
    }
    if (!validateImages(images)) {
      setMesssage("The product must have at least one image");
      return;
    }

    const newProductCredentials = {
      name,
      description,
      price,
      stockQuantity,
      categories: categories
        .map((category) =>
          Object.keys(Categories).find(
            (key) => Categories[key as keyof typeof Categories] === category,
          ),
        )
        .filter(Boolean) as string[],
      brand,
      images,
    };

    try {
      const response = await createProduct(newProductCredentials);
      setMesssage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setMesssage(error.message);
      } else {
        setMesssage("An unexpected error occurred.");
      }
    }
  };

  /**
   * handles the submission for the update product form
   * @returns
   */
  const handleUpdateProduct = async () => {
    setMesssage("");

    // validate the data before sending the form
    if (!validateName(name)) {
      setMesssage("The product name must be at least 3 characters long");
      return;
    }
    if (!validateDescription(description)) {
      setMesssage(
        "The product description must be at least 10 characters long",
      );
      return;
    }
    if (!validatePrice(price)) {
      setMesssage("The product price must be greater than 0");
      return;
    }
    if (!validateStockQuantity(stockQuantity)) {
      setMesssage("The product quantity must be 0 or greater");
      return;
    }
    if (!validateCategories(categories)) {
      setMesssage("The product must have at least one category");
      return;
    }
    if (!validateBrand(brand)) {
      setMesssage("The product brand must be at least 3 characters long");
      return;
    }
    if (!validateImages(images)) {
      setMesssage("The product must have at least one image");
      return;
    }

    const newProductCredentials = {
      name,
      description,
      price,
      stockQuantity,
      categories: categories
        .map((category) =>
          Object.keys(Categories).find(
            (key) => Categories[key as keyof typeof Categories] === category,
          ),
        )
        .filter(Boolean) as string[],
      brand,
      images,
    };

    try {
      if (!product?.productId) {
        setMesssage("The product doesn't have an id");
        return;
      }
      const response = await updateProduct(
        product.productId,
        newProductCredentials,
      );
      setMesssage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setMesssage(error.message);
      } else {
        setMesssage("An unexpected error occurred.");
      }
    }
  };

  /**
   * handles the submission for the delete product form
   * @returns
   */
  const handleDeleteProduct = async () => {
    setMesssage("");
    try {
      if (!product?.productId) {
        setMesssage("The product doesn't have an id");
        return;
      }
      const response = await deleteProduct(product.productId);
      setMesssage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setMesssage(error.message);
      } else {
        setMesssage("An unexpected error occurred.");
      }
    }
  };

  const handleImageLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedImages = [...images];
    updatedImages[0] = e.target.value;
    setImages(updatedImages);
  };

  /**
   * handles the categories set stament
   * @param category the category to add or delete
   */
  const toggleCategories = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((s) => s !== category)
        : [...prevCategories, category],
    );
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
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      {images[0] && (
        <div className="mb-6">
          <img
            src={images[0]}
            alt="Product"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-tag mr-1"></i> Product Name
            </label>
            <input
              type="text"
              className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-info-circle mr-1"></i> Description
            </label>
            <textarea
              className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-dollar-sign mr-1"></i> Price
            </label>
            <input
              type="number"
              className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-boxes mr-1"></i> Stock Quantity
            </label>
            <input
              type="number"
              className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
              placeholder="Enter stock quantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </div>

          {/* Categories Field */}
          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-wrench mr-1"></i> Categories
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(Categories).map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={categories.includes(category)}
                    onChange={() => toggleCategories(category)}
                  />
                  <span className="text-custom-dark">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-industry mr-1"></i> Brand
            </label>
            <input
              type="text"
              className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-image mr-1"></i> Image Link
            </label>
            <input
              type="text"
              className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
              placeholder="Enter image URL"
              value={images[0] || ""}
              onChange={handleImageLinkChange}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {product ? (
            <>
              <button
                type="button"
                className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleUpdateProduct}
              >
                <i className="fa-solid fa-share mr-1"></i> Update
              </button>
              <button
                type="button"
                className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleDeleteProduct}
              >
                <i className="fa-solid fa-trash mr-1"></i> Delete
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleCreateProduct}
            >
              <i className="fa-solid fa-plus mr-1"></i> Add Product
            </button>
          )}
        </div>
      </form>
      {message && (
        <p className="text-custom-silver text-center mt-4">{message}</p>
      )}
    </div>
  );
}
