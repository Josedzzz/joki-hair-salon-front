import { useState } from "react";
import {
  getAvailableHours,
  bookAppointment,
} from "../services/clientAppointmentService";

enum Services {
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

export default function UserAppointment() {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [endDate, setEndDate] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [availableHours, setAvailableHours] = useState<{
    [date: string]: string[];
  }>({});
  const [selectedHour, setSelectedHour] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * get all the availableHours given the start and end date
   */
  const handleGetAvailableHours = async () => {
    setMessage("");
    setLoading(true);
    if (!startDate || !endDate || selectedServices.length === 0) {
      setMessage("Please select a date range and at least one service.");
      return;
    }
    try {
      const uppercaseServices = selectedServices.map(
        (service) =>
          Object.keys(Services).find(
            (key) => Services[key as keyof typeof Services] === service,
          ) || service,
      );

      const response = await getAvailableHours({
        startDate,
        endDate,
        services: uppercaseServices,
      });
      setAvailableHours(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * handle the appointment service
   */
  const handleBookAppointment = async () => {
    setMessage("");
    if (!selectedHour) {
      setMessage("Please select a date and hour for the appointment");
      return;
    }

    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        setMessage("The client doesn't have an id");
        return;
      }

      const uppercaseServices = selectedServices.map(
        (service) =>
          Object.keys(Services).find(
            (key) => Services[key as keyof typeof Services] === service,
          ) || service,
      );

      const response = await bookAppointment(clientId, {
        date: selectedHour,
        servicesList: uppercaseServices,
      });
      setMessage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  /**
   * format the date and time to a unique string
   * @param date the date to concat
   * @param time the time to concat
   * @returns the formated date
   */
  const formatDateTime = (date: string, time: string) => {
    return `${date}T${time.slice(0, 5)}`; // "YYYY-MM-DDTHH:MM"
  };

  /**
   * handles the service set stament
   * @param service the service to add or delete
   */
  const toggleService = (service: string) => {
    setSelectedServices((prevService) =>
      prevService.includes(service)
        ? prevService.filter((s) => s !== service)
        : [...prevService, service],
    );
  };

  return (
    <div className="bg-custom-white w-full min-h-[calc(100vh-4rem)] p-6">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

      {/* Date Selection */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block font-semibold">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={startDate}
            className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
          />
        </div>

        <div className="w-1/2">
          <label className="block font-semibold">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
          />
        </div>
      </div>

      {/* Services field */}
      <div className="mb-4 px-3 py-2 rounded-lg ring-2 ring-custom-dark bg-custom-white">
        <label className="block text-custom-dark mb-2">
          <i className="fa-solid fa-wrench mr-1"></i> Select the services you
          want
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(Services).map((service) => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedServices.includes(service)}
                onChange={() => toggleService(service)}
              />
              <span className="text-custom-dark">{service}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Button for availableHours */}
      <button
        onClick={handleGetAvailableHours}
        className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
      >
        Check Available Hours
      </button>

      {/* Available Hours Display */}
      {loading ? (
        <p>Loading available hours...</p>
      ) : (
        <div className="my-4">
          {Object.entries(availableHours).map(([date, hours]) => (
            <div key={date} className="mb-4">
              <h3 className="font-bold">{date}</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {hours.length > 0 ? (
                  hours.map((hour, index) => (
                    <div
                      key={`${date}-${index}`}
                      onClick={() =>
                        setSelectedHour(formatDateTime(date, hour))
                      }
                      className="px-2 py-1 rounded bg-custom-platinum hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      {hour}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No hours available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book appointment */}
      <div className="flex flex-col gap-4">
        <label className="block font-semibold">Appointment date:</label>
        <input
          type="datetime-local"
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
          min={startDate}
          className="bg-custom-white text-custom-dark w-1/5 px-3 py-2 rounded-lg ring-2 ring-custom-dark focus:ring-custom-silver focus:outline-none"
        />
        <button
          onClick={handleBookAppointment}
          className="text-custom-dark w-1/5 font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
        >
          Book Appointment
        </button>
      </div>

      {message && (
        <p className="text-custom-silver text-center mt-4">{message}</p>
      )}
    </div>
  );
}
