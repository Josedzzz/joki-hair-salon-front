import { useEffect, useState } from "react";
import { Employee, getAllTeam } from "../services/clientTeamService";
import UserTeamCard from "./UserTeamCard";
import UserTeamInfo from "./UserTeamInfo";

export default function UserTeam() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * manage the state to select an employee
   * @param employee the employee to select
   */
  const handleSelectEmployee = async (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  /**
   * get all the employees
   * @param page the page to render
   */
  const handleGetAllEmployees = async (page: number = 0) => {
    setLoading(true);
    try {
      const response = await getAllTeam(page);
      setEmployees(response.data.content);
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
      handleGetAllEmployees(currentPage + 1);
    }
  };

  /**
   * handle previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handleGetAllEmployees(currentPage - 1);
    }
  };

  // fetch employees when the page changes
  useEffect(() => {
    handleGetAllEmployees();
  }, []);

  return (
    <div className="bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6 slide-in-left">
      {!selectedEmployee ? (
        <div className="px-4 py-6">
          <div className="flex flex-row items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-custom-dark">
              Meet our Team
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
            {employees.map((employee) => (
              <UserTeamCard
                key={employee.completeName}
                employee={employee}
                onClick={() => handleSelectEmployee(employee)}
              />
            ))}
          </div>
          {loading && <p className="text-custom-dark">Loading...</p>}
        </div>
      ) : (
        <UserTeamInfo
          employee={selectedEmployee}
          onBack={async () => {
            setSelectedEmployee(null);
            await handleGetAllEmployees();
          }}
        />
      )}
    </div>
  );
}
