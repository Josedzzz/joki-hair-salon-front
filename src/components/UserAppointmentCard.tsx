import { Appointment } from "../services/clientHistoryService";

// interface for the props of the component
interface UserAppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

export default function UserAppointmentCard({
  appointment,
  onClick,
}: UserAppointmentCardProps) {
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
    <div
      onClick={onClick}
      className="relative rounded-xl overflow-hidden max-w-xs p-4 h-64 bg-custom-platinum border-4 border-transparent hover:border-black transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Appointment Date and Time */}
        <div className="text-custom-dark">
          <h3 className="text-xl font-bold">{formattedDate}</h3>
          <p className="text-lg opacity-75">Time: {formattedTime}</p>
        </div>

        {/* Appointment Details */}
        <div className="text-custom-dark">
          <p className="text-xl font-semibold">
            ${appointment.price.toFixed(2)}
          </p>
          <p className="text-sm opacity-70">Status: {appointment.status}</p>
          <p className="text-sm opacity-70">Services:</p>
          <ul className="list-disc pl-5 text-sm opacity-90">
            {appointment.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
