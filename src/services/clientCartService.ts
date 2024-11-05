export interface ProductCart {
  productName: string;
  totalPrice: number;
  selectQty: number;
  brandName: string;
}

interface AddProductCredentials {
  productId: string;
  quantity: number;
}

interface DeleteProductCredentials {
  productName: string;
}

interface ApiResponseCartProducts {
  status: string;
  message: string;
  data: {
    productsInShoppingCart: ProductCart[];
    totalPrice: number;
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets all the product on the client's cart
 * @param clientId the id of the client
 * @returns the ApiResponseCartProducts with the data
 */
export const getClientCart = async (
  clientId: string,
): Promise<ApiResponseCartProducts> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/load-shopping-cart/${clientId}`,
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

    const successResponse: ApiResponseCartProducts = await response.json();

    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting the client cart: ", error);
    throw error;
  }
};

/**
 * Promise function to add an item to the cart
 * @param clientId the id of the client
 * @param credentials the AddProductCredentials interface
 * @returns the ApiResponse interface with the message
 */
export const addProductToCart = async (
  clientId: string,
  credentials: AddProductCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/add-product-sp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    if (response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    const successResponse: ApiResponse = await response.json();

    // checks that the json contains the message
    if (successResponse.message) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error adding the product to the cart ", error);
    throw error;
  }
};

/**
 * Promise function to delete an item from the cart
 * @param clientId the id of the client
 * @param credentials the DeleteProductCredentials interface
 * @returns the ApiResponse interface with the message
 */
export const deleteProductFromCart = async (
  clientId: string,
  credentials: DeleteProductCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/delete-product-sp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },
    );

    if (response.ok) {
      // handle the error response
      const errorResponse: ApiResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    const successResponse: ApiResponse = await response.json();

    // checks that the json contains the message
    if (successResponse.message) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error deleting the product from the cart: ", error);
    throw error;
  }
};
