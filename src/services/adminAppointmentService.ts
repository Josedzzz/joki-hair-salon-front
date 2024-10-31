export interface Appointment {
  clientId: string;
  employeeId: string;
  appointmentDateTime: string;
  services: string[];
  price: number;
  status: string;
}

export interface Client {
  clientId: string;
  email: string;
  username: string;
}

export interface Employee {
  completeName: string;
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

interface ApiResponseClient {
  status: string;
  message: string;
  data: Client;
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
 * Promise function that gets the response to get all the appointments
 * @param page the page number
 * @returns the ApiResponseAppointments with the information about the appointments
 */
export const getAllAppointments = async (
  page: number,
): Promise<ApiResponseAppointments> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-all-appointments?page=${page}&size=8`,
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

    // checks that the json contains the data
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting all the appointments: ", error);
    throw error;
  }
};

/**
 * Promise function that gets the client info
 * @param clientId the client Id
 * @returns the ApiResponseClient with the information about the client
 */
export const getClientInfo = async (
  clientId: string,
): Promise<ApiResponseClient> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-client-info/${clientId}`,
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

    const successResponse: ApiResponseClient = await response.json();

    // checks that the json contains the data
    if (successResponse.data) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error getting the client info: ", error);
    throw error;
  }
};

/**
 * Promise function that gets the employee info
 * @param employeeId the employee Id
 * @returns the ApiResponseEmployee with the information about the employee
 */
export const getEmployeeInfo = async (
  employeeId: string,
): Promise<ApiResponseEmployee> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-employee-info/${employeeId}`,
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
