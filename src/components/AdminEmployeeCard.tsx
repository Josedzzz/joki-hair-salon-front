import { Employee } from "../services/adminEmployeeService";

enum Skills {
  HAIRCUT = "Haircut",
  COLORING = "Coloring",
  BEARD = "Beard",
  SHAMPOO = "Shampoo",
  BLOW_DRY = "Blow Dry",
  PERM = "Perm",
  HIGHLIGHTS = "Highlights",
  HAIR_TREATMENT = "Hair Treatment",
  EXTENSIONS = "Extensions",
  HAIRS_STRAIGHTENING = "Hair Straightening",
}

// interface for the props of the component
interface AdminEmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

export default function AdminEmployeeCard({
  employee,
  onClick,
}: AdminEmployeeCardProps) {
  // map each skill to its display value in the Skills enum
  const formattedSkills = employee.skills
    .map((skill) => Skills[skill as keyof typeof Skills] || skill)
    .join(", ");

  return (
    <div
      onClick={onClick}
      className="bg-custom-platinum rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-custom-dark transition duration-300 ease-in-out transform hover:scale-105 bounce-in"
    >
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-dark mb-2">
          {employee.completeName}
        </h3>
        <p className="text-custom-silver">{formattedSkills}</p>
      </div>
    </div>
  );
}
