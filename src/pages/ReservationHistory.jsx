import React, { useState, useEffect } from "react";
import "./ReservationHistory.css";
import Navbar from "../ui/Navbar";
import { useNavigate } from "react-router-dom";
import ReservationHistoryCard from "../ui/ReservationHistoryCard";

function ReservationHistory({ loggedUser }) {
    const [reservations, setReservations] = useState(null);
  
    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const response = await fetch(
            `http://localhost:8090/api/v1/reservation/finishedForUser/${loggedUser.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();

            // Fetch total price for each reservation
            const reservationsWithPrices = await Promise.all(
              data.map(async (reservation) => {
                const totalPriceResponse = await fetch(
                  `http://localhost:8090/api/v1/reservation/totalPriceForReservation/${reservation.id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                if (totalPriceResponse.ok) {
                  const totalPriceData = await totalPriceResponse.json();
                  return {
                    ...reservation,
                    totalPrice: totalPriceData,
                  };
                } else {
                  console.error(`Failed to fetch total price for reservation ${reservation.id}`);
                  return reservation;
                }
              })
            );

            setReservations(reservationsWithPrices);
            console.log(reservations)
          } else {
            console.error("Failed to fetch reservations for user");
            // Optionally, set reservations to an empty array or an error state
            setReservations([]);
          }
        } catch (error) {
          console.error("Error fetching reservations", error);
          // Optionally, set reservations to an empty array or an error state
          setReservations([]);
        }
      };
  
      fetchReservations();
    }, [loggedUser.id]);
  
    // Render logic
    if (reservations === null) {
      // Render a loading state or a placeholder
      return <div>Loading reservations...</div>;
    }
  
    return (
      <div className="reservations-container">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationHistoryCard
              key={reservation.id}
              reservation={reservation}
              loggedUser={loggedUser}
            />
          ))
        ) : (
          <div>No reservations found.</div>
        )}
      </div>
    );
  }
  
  export default ReservationHistory;
  