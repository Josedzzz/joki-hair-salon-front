export interface ServiceReport {
  serviceType: string;
  totalBookings: number;
  totalRevenue: number;
  totalServiceTime: number;
}

interface ApiResponseReports {
  status: string;
  message: string;
  data: {
    serviceDemandReport: ServiceReport[];
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: string;
}

/**
 * Promise function that gets the general reports
 * @param startDate the startDate to get the reports
 * @param endDate the endDate to get the reports
 * @returns the ApiResponseReports with the reports information
 */
export const getReport = async (
  startDate: string,
  endDate: string,
): Promise<ApiResponseReports> => {
  try {
    const response = await fetch(
      `https://joki-hair-salon-production.up.railway.app/api/admin/get-general-report?startDate=${startDate}&endDate=${endDate}`,
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

    const successResponse: ApiResponseReports = await response.json();

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
