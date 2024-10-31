import {
  Appointment,
  Client,
  Employee,
} from "../services/adminAppointmentService";

// Props interface for the component
interface AdminAppointmentInfoProps {
  appointment: Appointment;
  client: Client | null;
  employee: Employee | null;
  onBack: () => void;
}

export default function AdminAppointmentInfo({
  appointment,
  client,
  employee,
  onBack,
}: AdminAppointmentInfoProps) {
  const appointmentDate = new Date(appointment.appointmentDateTime);
  const formattedDate = appointmentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = appointmentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-custom-platinum rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out mb-4 transform hover:scale-105"
      >
        <i className="fa-solid fa-arrow-left mr-1"></i> Back
      </button>

      <h2 className="text-xl font-bold text-custom-dark mb-4">
        Appointment Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Appointment Date and Time */}
        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Date</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {formattedDate} at {formattedTime}
          </p>
        </div>

        {/* Appointment Status */}
        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Status</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {appointment.status}
          </p>
        </div>

        {/* Appointment Price */}
        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Price</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            ${appointment.price.toFixed(2)}
          </p>
        </div>

        {/* Employee Information */}
        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Employee</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {employee ? employee.completeName : "Unknown Employee"}
          </p>
        </div>

        {/* Client Information */}
        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Client</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {client ? client.username : "Unknown Client"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Client email</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {client ? client.email : "Unknown Client"}
          </p>
        </div>

        {/* Services */}
        <div className="mb-4 col-span-1 md:col-span-2">
          <label className="block text-custom-dark mb-2">Services</label>
          <ul className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark list-disc pl-5">
            {appointment.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
