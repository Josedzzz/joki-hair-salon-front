export interface Appointment {
  appointmentId: string;
  clientId: string;
  employeeId: string;
  appointmentDateTime: string;
  services: string[];
  price: number;
  status: string;
}

export interface Employee {
  completeName: string;
  skills: string[];
  reviews: Review[];
}

interface Review {
  comment: string;
  rating: number;
}

interface ApiResponseAppointments {
  status: string;
  message: string;
  data: {
    totalPages: number;
    currentPage: number;
    content: Appointment[];
  };
}

interface ApiResponseEmployee {
  status: string;
  message: string;
  data: Employee;
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the response the client's appointments
 * @param page the page number
 * @param clientId the id of the client
 * @returns the ApiResponseAppointments with the data
 */
export const getAllClientAppointments = async (
  page: number,
  clientId: string,
): Promise<ApiResponseAppointments> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/appointment-history?page=${page}&size=8`,
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

    const successResponse: ApiResponseAppointments = await response.json();

    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting the client history appointments: ", error);
    throw error;
  }
};

/**
 * Promise function that cances the appointment
 * @param clientId the id of the client
 * @param appointmentId the id of the appointment
 * @returns the ApiResponse with the message
 */
export const cancelAppointment = async (
  clientId: string,
  appointmentId: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${clientId}/cancel-appointment/${appointmentId}`,
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

    const successResponse: ApiResponse = await response.json();

    // checks that the json contains the message
    if (successResponse.message) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error canceling the client's appointment: ", error);
    throw error;
  }
};

/**
 * Promise function to leave a review
 * @param credentials the review credentials
 * @param appointmentId the id of the appointment
 * @returns the ApiResponse with the message
 */
export const leaveReview = async (
  credentials: Review,
  appointmentId: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/${appointmentId}/leave-review`,
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
    console.error("Error leaving the client's review: ", error);
    throw error;
  }
};

/**
 * Promise function that gets the employee info
 * @param employeeId the employee Id
 * @returns the ApiResponseEmployee with the information about the employee
 */
export const getEmployee = async (
  employeeId: string,
): Promise<ApiResponseEmployee> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/get-employee/${employeeId}`,
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

    const successResponse: ApiResponseEmployee = await response.json();

    // checks that the json contains the data
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting the employee info: ", error);
    throw error;
  }
};
