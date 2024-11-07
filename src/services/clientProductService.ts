export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categories: string[];
  brand: string;
  dateAdded: string;
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
      `https://joki-hair-salon-production.up.railway.app/api/client/load-products?page=${page}&size=8`,
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
