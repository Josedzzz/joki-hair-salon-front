import { useEffect, useState } from "react";
import { getAllEmployees, Employee } from "../services/adminEmployeeService";
import AdminEmployeeCard from "./AdminEmployeeCard";
import AdminEmployeeInfo from "./AdminEmployeeInfo";

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

export default function AdminEmployee() {
  const [employeesToDisplay, setEmployeesToDisplay] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isAddingNewEmployee, setIsAddingNewEmployee] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * manage the states to add an employee
   */
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsAddingNewEmployee(true);
  };

  /**
   * manage the states to select an employee
   * @param employee the employee to select
   */
  const handleSelectEmployee = async (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAddingNewEmployee(false);
  };

  /**
   * get all the employees
   */
  const handleGetAllEmployes = async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await getAllEmployees(page);
      setEmployeesToDisplay(response.data.content);
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
      handleGetAllEmployes(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetAllEmployes(currentPage - 1);
    }
  };

  // fetch employees when the page changes
  useEffect(() => {
    handleGetAllEmployes();
  }, []);

  return (
    <div className="bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6 slide-in-left">
      {!selectedEmployee && !isAddingNewEmployee ? (
        <div className="px-4 py-6">
          <div className="flex flex-row items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-custom-dark">
              Manage Employees
            </h2>
            <button
              onClick={handleAddEmployee}
              className="w-50px text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              <i className="fa-solid fa-plus"></i> Add a new Employee
            </button>
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
            {employeesToDisplay.map((employee) => (
              <AdminEmployeeCard
                key={employee.employeeId}
                employee={employee}
                onClick={() => handleSelectEmployee(employee)}
              />
            ))}
          </div>
          {loading && <p className="text-custom-dark">Loading...</p>}
        </div>
      ) : (
        <AdminEmployeeInfo
          employee={selectedEmployee}
          onBack={async () => {
            setSelectedEmployee(null);
            setIsAddingNewEmployee(false);
            await handleGetAllEmployes();
          }}
        />
      )}
    </div>
  );
}
