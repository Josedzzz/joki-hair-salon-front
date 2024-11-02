import { useState } from "react";
import {
  Appointment,
  cancelAppointment,
  Employee,
  leaveReview,
} from "../services/clientHistoryService";

// interface for the props of the component
interface UserAppointmentInfoProps {
  appointment: Appointment;
  employee: Employee | null;
  onBack: () => void;
}

export default function UserAppointmentInfo({
  appointment,
  employee,
  onBack,
}: UserAppointmentInfoProps) {
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
  const isPastAppointment = appointmentDate < new Date();
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  /**
   * validate that the review is at least 10 chars long
   * @param review the review to validate
   * @returns the boolean response
   */
  const validateReview = (review: string) => {
    return review.length >= 10;
  };

  /**
   * validate that the rating is between 1 and 5
   * @param rating the rating to validate
   * @returns the boolean response
   */
  const validateRating = (rating: number) => {
    return rating >= 1 && rating <= 5;
  };

  /**
   * handle the leave review service
   */
  const handleLeaveReview = async () => {
    setMessage("");

    // validate the data before sending the form
    if (!validateReview(reviewComment)) {
      setMessage("The review must be at least 10 characters long");
      console.log("dani mk");
      return;
    }
    if (reviewRating === null) {
      setMessage("Please enter a rating");
      return;
    }
    if (!validateRating(reviewRating)) {
      setMessage("The rating must be between 1 - 5");
      return;
    }
    try {
      const response = await leaveReview(
        { comment: reviewComment, rating: reviewRating },
        appointment.appointmentId,
      );
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
   * handles the cances appointment service
   */
  const handleCancelAppointment = async () => {
    setMessage("");
    try {
      const response = await cancelAppointment(
        appointment.clientId,
        appointment.appointmentId,
      );
      setMessage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
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
        Appointment Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Date</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {formattedDate} at {formattedTime}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Status</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {appointment.status}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Price</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            ${appointment.price.toFixed(2)}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-custom-dark mb-2">Employee</label>
          <p className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark">
            {employee ? employee.completeName : "Unknown Employee"}
          </p>
        </div>

        <div className="mb-4 col-span-1 md:col-span-2">
          <label className="block text-custom-dark mb-2">Services</label>
          <ul className="bg-custom-white text-custom-dark w-full px-3 py-2 rounded-lg ring-2 ring-custom-dark list-disc pl-5">
            {appointment.services.map((service, index) => (
              <li key={index}>{service}</li>
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

      <div className="mt-4">
        {isPastAppointment ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Write your review"
              className="bg-custom-white text-custom-dark px-3 py-2 border-2 border-custom-dark rounded-lg w-full md:w-auto"
            />
            <select
              value={reviewRating ?? ""}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="bg-custom-white text-custom-dark px-3 py-2 border-2 border-custom-dark rounded-lg"
            >
              <option value="" disabled>
                Rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button
              onClick={handleLeaveReview}
              className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
            >
              Leave a Review
            </button>
          </div>
        ) : (
          <button
            className="text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleCancelAppointment}
          >
            Cancel Appointment
          </button>
        )}
      </div>

      {message && (
        <p className="text-custom-silver text-center mt-4">{message}</p>
      )}
    </div>
  );
}
