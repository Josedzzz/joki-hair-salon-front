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
