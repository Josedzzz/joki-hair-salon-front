import { useEffect, useState } from "react";
import {
  Appointment,
  Client,
  Employee,
  getAllAppointments,
  getClientInfo,
  getEmployeeInfo,
} from "../services/adminAppointmentService";
import AdminAppointmentCard from "./AdminAppointmentCard";
import AdminAppointmentInfo from "./AdminAppointmentInfo";

export default function AdminAppointment() {
  const [appointmentsToDisplay, setAppointmentsToDisplay] = useState<
    Appointment[]
  >([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * handles the states to select an appointment
   * @param appointment the appointment to select
   */
  const handleSelectAppointment = async (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    try {
      const responseClient = await getClientInfo(appointment.clientId);
      const responseEmployee = await getEmployeeInfo(appointment.employeeId);
      setClient(responseClient.data);
      setEmployee(responseEmployee.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * get all the appointments
   * @param page the page to render
   */
  const handleGetAllAppointments = async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await getAllAppointments(page);
      setAppointmentsToDisplay(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error(error);
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
              Appointments
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
            {appointmentsToDisplay.map((appointment) => (
              <AdminAppointmentCard
                key={appointment.appointmentDateTime}
                appointment={appointment}
                onClick={() => handleSelectAppointment(appointment)}
              />
            ))}
          </div>

          {loading && <p className="text-custom-dark">Loading...</p>}
        </div>
      ) : (
        <AdminAppointmentInfo
          appointment={selectedAppointment}
          client={client}
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
