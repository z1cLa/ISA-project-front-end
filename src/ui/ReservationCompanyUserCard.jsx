import React from "react";
import "./ReservationCard.css";

const ReservationCompanyUserCard = ({ reservation }) => {

  return (
    <div className="reservation-card">
      <h3>Reservation #{reservation.id}</h3>
      <p>
        <strong>User:</strong> {reservation.user.firstName}{" "}
        {reservation.user.lastName}
      </p>
    </div>
  );
};

export default ReservationCompanyUserCard;
