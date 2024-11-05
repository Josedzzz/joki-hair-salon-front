interface LoginCredentials {
  username: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  username: string;
  password: string;
}

interface SendVerificationCodeCredentials {
  email: string;
}

interface RecoverPasswordCredentials {
  email: string;
  verificationCode: string;
  newPassword: string;
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

/**
 * Promise function that gets the response for the sended password code
 * @param email the email where the recover code arrives
 * @returns the response message
 */
export const sendRecoverPasswordCode = async (
  credentials: SendVerificationCodeCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/send-password-reset-code`,
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

    // checks that the json contains the response message
    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error sending the verification code", error);
    throw error;
  }
};

/**
 * Promise function to get the response for the updated password
 * @param credentials the credentials to updated the new password
 * @returns the response interface with the message
 */
export const recoverPasswordCode = async (
  credentials: RecoverPasswordCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/update-password`,
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

    // checks that the json contains the response message
    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error during the recover:", error);
    throw error;
  }
};
