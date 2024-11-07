export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categories: string[];
  brand: string;
  dateAdded: string;
  rating: number;
  images: string[];
}

interface CreateProductCredentials {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categories: string[];
  brand: string;
  images: string[];
}

interface ApiResponseProducts {
  status: string;
  message: string;
  data: {
    totalPages: number;
    currentPage: number;
    content: Product[];
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response to get all the products
 * @param page the page number
 * @returns the ApiResponseProducts with the information about the products
 */
export const getAllProducts = async (
  page: number,
): Promise<ApiResponseProducts> => {
  try {
    const response = await fetch(
      `https://joki-hair-salon-production.up.railway.app/api/admin/get-products?page=${page}&size=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    const successResponse: ApiResponseProducts = await response.json();

    // checks that the json contains the data
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting all the events: ", error);
    throw error;
  }
};

/**
 * Promise function that creates a product
 * @param credentials the CreateProductCredentials containing the product info
 * @returns the api response interface
 */
export const createProduct = async (
  credentials: CreateProductCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `https://joki-hair-salon-production.up.railway.app/api/admin/create-product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    if (!response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // read the response
    const successResponse: ApiResponse = await response.json();

    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error creating the product: ", error);
    throw error;
  }
};

/**
 * Promise function that updates the product info
 * @param productId the id of the product to update
 * @param credentials the credentials of the product to update
 * @returns the api response interface
 */
export const updateProduct = async (
  productId: string,
  credentials: CreateProductCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `https://joki-hair-salon-production.up.railway.app/api/admin/update-product/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    if (!response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // read the response
    const successResponse: ApiResponse = await response.json();

    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error updating the product: ", error);
    throw error;
  }
};

/**
 * Promise function to delete a product
 * @param productId the id of the product to delete
 * @returns the api response interface with the message
 */
export const deleteProduct = async (
  productId: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `https://joki-hair-salon-production.up.railway.app/api/admin/delete-product/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    // read the response
    const successResponse: ApiResponse = await response.json();

    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error deleting the product: ", error);
    throw error;
  }
};
