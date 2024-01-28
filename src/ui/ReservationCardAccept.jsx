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

  const acceptReservation = async (id) => {
    // Determine points based on the appointment date
    // const appointmentDate = new Date(reservation.appointment.date);
    // const currentDate = new Date();
    // const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
    // const points = appointmentDate - currentDate <= twentyFourHoursInMs ? 2 : 1;

    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/reservation/finish/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toastr.success("Reservation accepted succesfully");
      console.log("RES:", reservation.appointment.id);
      navigate("/");
    } catch (error) {
      console.error("Error cancelling reservation:", error);
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
        onClick={() => acceptReservation(reservation.id)}
        className="accept-btn"
      >
        Accept Reservation
      </button>
    </div>
  );
};

export default ReservationCard;
