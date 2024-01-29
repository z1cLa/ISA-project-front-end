import React from "react";
import "./ReservationHistoryCard.css";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

const ReservationHistoryCard = ({
  loggedUser,
  reservation,
}) => {
  // Formatting the date
  const formattedDate = new Date(
    reservation.appointment.date
  ).toLocaleDateString();

  const navigate = useNavigate();

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
      <p>
        <strong>Total Price:</strong> {reservation.totalPrice.toFixed(2)} RSD
      </p>
    </div>
  );
};

export default ReservationHistoryCard;