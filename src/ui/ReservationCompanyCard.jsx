import React from "react";
import "./ReservationCard.css";

const ReservationCompanyCard = ({ reservation }) => {
  // Formatting the date
  const formattedDate = new Date(
    reservation.appointment.date
  ).toLocaleDateString();

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
    </div>
  );
};

export default ReservationCompanyCard;
