import { EmployeeData } from "./AdminEmployee";

// interface for the props of the component
interface AdminEmployeeCardProps {
  employee: EmployeeData;
  onClick: () => void;
}

export default function AdminEmployeeCard({
  employee,
  onClick,
}: AdminEmployeeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-custom-platinum rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-custom-dark transition duration-300 ease-in-out"
    >
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-dark mb-2">
          {employee.completeName}
        </h3>
        <p className="text-custom-silver">{employee.skills.join(", ")}</p>
      </div>
    </div>
  );
}
