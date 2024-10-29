interface Employee {
  employeeId: string;
  completeName: string;
  skills: string[];
}

interface DaySchedule {
  startTime: string;
  endTime: string;
}

export interface WorkSchedule {
  MONDAY: DaySchedule;
  TUESDAY: DaySchedule;
  WEDNESDAY: DaySchedule;
  THURSDAY: DaySchedule;
  FRIDAY: DaySchedule;
  SATURDAY: DaySchedule;
  SUNDAY: DaySchedule;
}

interface CreateEmployeeCredentials {
  completeName: string;
  workSchedule: {
    workSchedule: {
      [day: string]: {
        startTime: string;
        endTime: string;
      };
    };
  };
  skills: string[];
  hireDate: string;
}

interface updateEmployeeCredentials {
  completeName: string;
  skills: string[];
}

export interface ApiResponseEmployee {
  status: string;
  message: string;
  data: {
    completeName: string;
    workSchedule: {
      workSchedule: WorkSchedule;
    };
    skills: string[];
  };
}

interface ApiResponseEmployees {
  status: string;
  message: string;
  data: Employee[];
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets all the employees
 * @returns the ApiResponseEmployees that gets some employees information
 */
export const getAllEmployees = async (): Promise<ApiResponseEmployees> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/get-all-employees`,
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
    const successResponse: ApiResponseEmployees = await response.json();

    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error obtaining all the employees: ", error);
    throw error;
  }
};

/**
 * Promise function that gets an employee
 * @returns the ApiResponseEmployee
 */
export const getEmployee = async (
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

    // read the response as a json
    const successResponse: ApiResponseEmployee = await response.json();

    if ("data" in successResponse) {
      return successResponse;
    } else {
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error obtaining the employee: ", error);
    throw error;
  }
};

/**
 * Promise function that creates an employee
 * @param credentials the CreateEmployeeCredentials containing the employee info
 * @returns the api response interface
 */
export const createEmployee = async (
  credentials: CreateEmployeeCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/create-employee`,
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
    console.error("Error creating the employee: ", error);
    throw error;
  }
};

/**
 * Promise function that updates the employee info
 * @param employeeId the id of the employee to update
 * @param credentials the credentials of the employee to update
 * @returns the api response interface
 */
export const updateEmployee = async (
  employeeId: string,
  credentials: updateEmployeeCredentials,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/update-employee/${employeeId}`,
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
    console.error("Error updating the employee: ", error);
    throw error;
  }
};

/**
 * Promise function to delete an employee
 * @param employeeId the id of the employee to delete
 * @returns the api response interface with the message
 */
export const deleteEmployee = async (
  employeeId: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/admin/delete-employee/${employeeId}`,
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
    console.error("Error deleting the employee: ", error);
    throw error;
  }
};
