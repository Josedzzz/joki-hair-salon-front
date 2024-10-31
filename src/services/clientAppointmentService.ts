interface ApiResponseAvailableHours {
  status: string;
  message: string;
  data: {
    [date: string]: string[];
  };
}

interface AvailableHoursCredentials {
  startDate: string;
  endDate: string;
  services: string[];
}

interface BookAppointmentCredentials {
  date: string;
  servicesList: string[];
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the available hours for a service
 * @param credentials the credentials to filter the hours
 * @returns the ApiResponseAvailableHours with the information about the hours
 */
export const getAvailableHours = async (
  credentials: AvailableHoursCredentials,
): Promise<ApiResponseAvailableHours> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/get-available-hours?startDate=${credentials.startDate}&endDate=${credentials.endDate}&services=${credentials.services}`,
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

    const successResponse: ApiResponseAvailableHours = await response.json();

    // checks that the json contains the data
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting the available hours: ", error);
    throw error;
  }
};

/**
 * Promise function that books an appointemt
 * @param clientId the id of the client
 * @param credentials the credentials of the appointemt
 * @returns the api response interface with the comfirmation message
 */
export const bookAppointment = async (
  clientId: string,
  credentials: BookAppointmentCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/book-appointment`,
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

    if ("message" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error booking an appointemt: ", error);
    throw error;
  }
};
