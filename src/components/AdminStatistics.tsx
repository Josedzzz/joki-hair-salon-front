import { useState } from "react";
import { getReport, ServiceReport } from "../services/adminStatisticsService";

export default function AdminStatistics() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reports, setReports] = useState<ServiceReport[]>([]);
  const [message, setMessage] = useState("");

  // Validación de fechas
  const validateDates = () => {
    if (!startDate || !endDate) {
      setMessage("Both start date and end date are required.");
      return false;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setMessage("Start date cannot be after end date.");
      return false;
    }
    return true;
  };

  const handleGetReport = async () => {
    setMessage("");

    if (!validateDates()) return;

    try {
      const response = await getReport(startDate, endDate);
      setReports(response.data.serviceDemandReport);
      setMessage(response.message || "Reports generated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6">
      <h1 className="text-2xl font-bold text-custom-dark mb-6">Statistics</h1>

      {/* Date Input Fields */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-custom-dark mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-custom-white text-custom-dark px-3 py-2 border-2 border-custom-dark rounded-lg"
          />
        </div>

        <div>
          <label className="block text-custom-dark mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-custom-white text-custom-dark px-3 py-2 border-2 border-custom-dark rounded-lg"
          />
        </div>

        {/* Generate Report Button */}
        <button
          onClick={handleGetReport}
          className="mt-6 text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
        >
          Generate Report
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <p className="text-custom-silver text-center mb-4">{message}</p>
      )}

      {/* Reports Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-custom-white p-4 rounded-lg border-2 border-custom-dark shadow-md"
          >
            <h3 className="text-lg font-bold text-custom-dark mb-2">
              {report.serviceType}
            </h3>
            <p className="text-custom-dark">
              Total Bookings: {report.totalBookings}
            </p>
            <p className="text-custom-dark">
              Total Revenue: ${report.totalRevenue.toFixed(2)}
            </p>
            <p className="text-custom-dark">
              Total Service Time: {report.totalServiceTime} hrs
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
