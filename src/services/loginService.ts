interface LoginCredentials {
  username: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  username: string;
  password: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response for the signUp
 * @param credentials the interface that contains  the signUp credentials
 * @returns the id of the client in a json
 */
export const signUp = async (
  credentials: SignupCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/client/register`,
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
    const loginResponse: ApiResponse = await response.json();

    if ("data" in loginResponse) {
      return loginResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the signUp: ", error);
    throw error;
  }
};

/**
 * Promise function that gets the response for the user login
 * @param credentials the login credentials interface containing the username and password
 * @param typeUser the user type who's going to login
 * @returns
 */
export const login = async (
  credentials: LoginCredentials,
  typeUser: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/${typeUser}/login`,
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

    const successResponse: ApiResponse = await response.json();

    // chek that the json contains a token for the login
    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};