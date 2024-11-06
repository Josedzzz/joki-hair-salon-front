export interface Account {
  email: string;
  username: string;
}

interface UpdateAccountCredentials {
  fullName: string;
  phoneNumber: string;
  email: string;
  username: string;
}

interface ApiResponseAccount {
  status: string;
  message: string;
  data: Account;
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the account info
 * @param clientId the id of the client
 * @returns the ApiResponseAccount that gets the account info
 */
export const getAccountInfo = async (
  clientId: string,
): Promise<ApiResponseAccount> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/account-information`,
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

    // read the response as a json
    const successResponse: ApiResponseAccount = await response.json();

    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error obtaining the account info: ", error);
    throw error;
  }
};

/**
 * Promise function that update the account
 * @param clientId the id of the client
 * @param credentials the UpdateAccountCredentials interface
 * @returns the ApiResponse interface with the message
 * */
export const updateAccount = async (
  clientId: string,
  credentials: UpdateAccountCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/update-client`,
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

    // read the response as a json
    const successResponse: ApiResponse = await response.json();

    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error updating the account info: ", error);
    throw error;
  }
};

/**
 * Promise function that deletes an account
 * @param clientId the id of the client
 * @returns the ApiResponse interface with the message
 * */
export const deleteAccount = async (clientId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/delete-account`,
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

    // read the response as a json
    const successResponse: ApiResponse = await response.json();

    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error deleting the account: ", error);
    throw error;
  }
};
