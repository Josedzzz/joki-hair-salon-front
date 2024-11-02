export interface Employee {
  completeName: string;
  skills: string[];
  reviews: Review[];
}

interface Review {
  comment: string;
  rating: number;
}

interface ApiResponseEmployees {
  status: string;
  message: string;
  data: {
    totalPages: number;
    currentPage: number;
    content: Employee[];
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets all the employees
 * @param page the page to get the employees
 * @returns the ApiResponseEmployees that contains the employees information pagitated
 */
export const getAllTeam = async (
  page: number = 0,
): Promise<ApiResponseEmployees> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/client/get-all-employees?page=${page}&size=8`,
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
