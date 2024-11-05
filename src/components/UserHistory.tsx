import { useEffect, useState } from "react";
import {
  Appointment,
  Employee,
  getAllClientAppointments,
  getEmployee,
} from "../services/clientHistoryService";
import UserAppointmentCard from "./UserAppointmentCard";
import UserAppointmentInfo from "./UserAppointmentInfo";

export default function UserHistory() {
  const [appointmentsToDisplay, setAppointmentsToDisplay] = useState<
    Appointment[]
  >([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState("");

  /**
   * handles the states to select an appointment
   * @param appointment the appointment to select
   */
  const handleSelectAppointment = async (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    try {
      const responseEmployee = await getEmployee(appointment.employeeId);
      setEmployee(responseEmployee.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * get all the appointments to display
   * @param page the page of the appointments
   */
  const handleGetAllAppointments = async (page: number = 0) => {
    setLoading(true);
    setMessage(""); // Clear any previous messages
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an ID.");
        return;
      }

      const response = await getAllClientAppointments(page, clientId);

      // Verificar si response.data y response.data.content están definidos
      const appointments = response.data?.content ?? [];
      const total = response.data?.totalPages ?? 1;
      const current = response.data?.currentPage ?? 0;

      setAppointmentsToDisplay(appointments);
      setTotalPages(total);
      setCurrentPage(current);

      // If no appointments, show a message
      if (appointments.length === 0) {
        setMessage("You have no appointments in your history.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while fetching appointments.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * handle next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handleGetAllAppointments(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetAllAppointments(currentPage - 1);
    }
  };

  // fetch appointments when the page changes
  useEffect(() => {
    handleGetAllAppointments();
  }, []);

  return (
    <div className="bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6 ">
      {!selectedAppointment ? (
        <div className="px-4 py-6">
          <div className="flex flex-row items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-custom-dark">
              Appointments History
            </h2>
          </div>

          <div className="mb-4 flex justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={loading || currentPage === 0}
              className={`w-50px text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-custom-dark hover:text-custom-white"
              }`}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={handleNextPage}
              disabled={loading || currentPage >= totalPages - 1}
              className={`w-50px text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl transition duration-300 ease-in-out transform hover:scale-105 ${
                currentPage >= totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-custom-dark hover:text-custom-white"
              }`}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {appointmentsToDisplay.length > 0
              ? appointmentsToDisplay.map((appointment) => (
                  <UserAppointmentCard
                    key={appointment.appointmentDateTime}
                    appointment={appointment}
                    onClick={() => handleSelectAppointment(appointment)}
                  />
                ))
              : !loading && (
                  <p className="text-custom-silver text-center mt-4">
                    {message || "No appointments available."}
                  </p>
                )}
          </div>

          {loading && <p className="text-custom-dark">Loading...</p>}
        </div>
      ) : (
        <UserAppointmentInfo
          appointment={selectedAppointment}
          employee={employee}
          onBack={async () => {
            setSelectedAppointment(null);
            await handleGetAllAppointments(currentPage);
          }}
        />
      )}
    </div>
  );
}
