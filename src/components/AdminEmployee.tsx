import { useEffect, useState } from "react";
import { getAllEmployees, getEmployee } from "../services/adminEmployeeService";
import AdminEmployeeCard from "./AdminEmployeeCard";
import AdminEmployeeInfo from "./AdminEmployeeInfo";

export interface EmployeeData {
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
}

export interface Employee {
  completeName: string;
  workSchedule: {
    workSchedule: WorkSchedule;
  };
  skills: string[];
}

export default function AdminEmployee() {
  const [employeesToDisplay, setEmployeesToDisplay] = useState<EmployeeData[]>(
    [],
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isAddingNewEmployee, setIsAddingNewEmployee] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const handleSelectEmployee = async (employee: EmployeeData) => {
    try {
      const response = await getEmployee(employee.employeeId);
      setSelectedEmployee(response.data);
      setIsAddingNewEmployee(false);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * get all the employees
   */
  const handleGetAllEmployes = async () => {
    setLoading(true);
    try {
      const response = await getAllEmployees();
      setEmployeesToDisplay(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // fetch employees when the page changes
  useEffect(() => {
    handleGetAllEmployes();
  }, []);

  return (
    <div className="bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6 ">
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
