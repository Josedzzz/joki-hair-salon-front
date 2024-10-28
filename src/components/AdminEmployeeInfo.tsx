import { useState } from "react";
import { Employee, WorkSchedule } from "./AdminEmployee";
import { createEmployee } from "../services/adminEmployeeService";

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

// Props interface for the component
interface AdminEmployeeInfoProps {
  employee: Employee | null;
  onBack: () => void;
}

export default function AdminEmployeeInfo({
  employee,
  onBack,
}: AdminEmployeeInfoProps) {
  const [name, setName] = useState(employee?.completeName || "");
  const initialSkills =
    employee?.skills.map((skill) => Skills[skill as keyof typeof Skills]) || [];
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule>(
    employee?.workSchedule?.workSchedule || {
      MONDAY: { startTime: "", endTime: "" },
      TUESDAY: { startTime: "", endTime: "" },
      WEDNESDAY: { startTime: "", endTime: "" },
      THURSDAY: { startTime: "", endTime: "" },
      FRIDAY: { startTime: "", endTime: "" },
      SATURDAY: { startTime: "", endTime: "" },
      SUNDAY: { startTime: "", endTime: "" },
    },
  );
  const [message, setMesssage] = useState("");

  const formatWorkSchedule = (workSchedule: WorkSchedule) => {
    return {
      workSchedule: {
        MONDAY: workSchedule.MONDAY,
        TUESDAY: workSchedule.TUESDAY,
        WEDNESDAY: workSchedule.WEDNESDAY,
        THURSDAY: workSchedule.THURSDAY,
        FRIDAY: workSchedule.FRIDAY,
        SATURDAY: workSchedule.SATURDAY,
        SUNDAY: workSchedule.SUNDAY,
      },
    };
  };

  /**
   * hadles the submission for the create employee form
   */
  const handleCreateEmployee = async () => {
    setMesssage("");

    const formattedWorkSchedule = formatWorkSchedule(workSchedule);
    const newEmployeeCredentials = {
      completeName: name,
      workSchedule: formattedWorkSchedule,
      skills: skills
        .map((skill) =>
          Object.keys(Skills).find(
            (key) => Skills[key as keyof typeof Skills] === skill,
          ),
        )
        .filter(Boolean) as string[],
      hireDate: new Date().toISOString(),
    };

    try {
      const response = await createEmployee(newEmployeeCredentials);
      setMesssage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setMesssage(error.message);
      } else {
        setMesssage("An unexpected error occurred.");
      }
    }
  };

  /**
   * handles the skills set stament
   * @param skill the skill to add or delete
   */
  const toggleSkill = (skill: string) => {
    setSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill],
    );
  };

  return (
    <div className="bg-custom-platinum rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out mb-4 transform hover:scale-105"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>
      <h2 className="text-xl font-bold text-custom-dark mb-4">
        {employee ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form>
        {/* Two-column layout for the inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-user mr-1"></i> Name
            </label>
            <input
              type="text"
              className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Skills Field */}
          <div className="mb-4">
            <label className="block text-custom-dark mb-2">
              <i className="fa-solid fa-wrench mr-1"></i> Skills
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(Skills).map((skill) => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={skills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  <span className="text-custom-dark">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Work Schedule Fields */}
          {(
            [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ] as (keyof WorkSchedule)[]
          ).map((day) => (
            <div key={day} className="mb-4">
              <label className="block text-custom-dark mb-2">
                <i className="fa-solid fa-clock mr-1"></i> {day} Schedule
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
                  placeholder="Start Time"
                  value={workSchedule[day]?.startTime || ""}
                  onChange={(e) =>
                    setWorkSchedule({
                      ...workSchedule,
                      [day]: {
                        ...workSchedule[day],
                        startTime: e.target.value,
                      },
                    })
                  }
                />
                <input
                  type="time"
                  className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
                  placeholder="End Time"
                  value={workSchedule[day]?.endTime || ""}
                  onChange={(e) =>
                    setWorkSchedule({
                      ...workSchedule,
                      [day]: {
                        ...workSchedule[day],
                        endTime: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {employee ? (
            <>
              <button
                type="button"
                className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              >
                <i className="fa-solid fa-share mr-1"></i> Update
              </button>
              <button
                type="button"
                className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              >
                <i className="fa-solid fa-trash mr-1"></i> Delete
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleCreateEmployee}
            >
              <i className="fa-solid fa-plus mr-1"></i> Add Employee
            </button>
          )}
        </div>
      </form>
      {message && (
        <p className="text-custom-silver text-center mt-4">{message}</p>
      )}
    </div>
  );
}
