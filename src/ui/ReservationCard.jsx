import React from "react";
import "./ReservationCard.css";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

const ReservationCard = ({
  loggedUser,
  reservation,
  onReservationCanceled,
}) => {
  // Formatting the date
  const formattedDate = new Date(
    reservation.appointment.date
  ).toLocaleDateString();

  const navigate = useNavigate();

  const cancelReservation = async (id) => {
    // Determine points based on the appointment date
    const appointmentDate = new Date(reservation.appointment.date);
    const currentDate = new Date();
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
    const points = appointmentDate - currentDate <= twentyFourHoursInMs ? 2 : 1;

    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/reservation/cancel/${id}/${points}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("RES:", reservation.appointment.id);

      if (response.ok) {
        console.log("Reservation cancelled successfully");
        toastr.success("Reservation cancelled succesfully");
        await fetch(`http://localhost:8090/api/v1/cancellation/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            appointmentId: reservation.appointment.id,
            userId: loggedUser.id,
          }),
        });
        navigate("/");
        // Handle successful cancellation (e.g., update UI, show a message)
      } else {
        console.error("Failed to cancel reservation");
        // Handle errors (e.g., show error message to user)
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      // Handle network errors (e.g., show error message to user)
    }
  };

  return (
    <div className="reservation-card">
      <h3>Reservation #{reservation.id}</h3>
      <p>
        <strong>Status:</strong> {reservation.status}
      </p>
      <p>
        <strong>User:</strong> {reservation.user.firstName}{" "}
        {reservation.user.lastName}
      </p>
      <p>
        <strong>Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Time:</strong> {reservation.appointment.time}
      </p>
      <p>
        <strong>Duration:</strong> {reservation.appointment.duration} hours
      </p>
      <button
        onClick={() => navigate(`/reservation/${reservation.id}`)}
        className="accept-btn"
      >
        Details
      </button>
      <button
        onClick={() => cancelReservation(reservation.id)}
        className="cancel-btn"
      >
        Cancel Reservation
      </button>
    </div>
  );
};

export default ReservationCard;
