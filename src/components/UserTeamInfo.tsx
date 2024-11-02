import { Employee } from "../services/clientTeamService";

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
interface UserTeamInfoProps {
  employee: Employee | null;
  onBack: () => void;
}

export default function UserTeamInfo({ employee, onBack }: UserTeamInfoProps) {
  return (
    <div className="bg-custom-platinum rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out mb-4 transform hover:scale-105"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>

      <h2 className="text-xl font-bold text-custom-dark mb-4">
        Employee Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-custom-dark mb-2 font-bold">
            Employee
          </label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {employee ? employee.completeName : "Unknown Employee"}
          </p>
        </div>

        <div className="mb-4 col-span-1 md:col-span-2">
          <label className="block text-custom-dark mb-2 font-bold">
            Skills
          </label>
          <ul className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {employee?.skills.map((service, index) => (
              <li key={index}>
                {Skills[service as keyof typeof Skills] || service}
              </li>
            ))}
          </ul>
        </div>

        {/* Employee reviews */}
        {employee && employee.reviews.length > 0 && (
          <div className="mb-4 col-span-1 md:col-span-2">
            <label className="block text-custom-dark mb-2 font-bold">
              Employee Reviews
            </label>
            <ul>
              {employee.reviews.map((review, index) => (
                <li
                  key={index}
                  className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark "
                >
                  <p>
                    <span className="font-bold">Rating:</span> {review.rating}/5
                  </p>
                  <p>
                    <span className="font-bold">Comment:</span> {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
