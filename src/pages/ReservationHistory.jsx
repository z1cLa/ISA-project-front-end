import React, { useState, useEffect } from "react";
import "./ReservationHistory.css";
import Navbar from "../ui/Navbar";
import { useNavigate } from "react-router-dom";
import ReservationHistoryCard from "../ui/ReservationHistoryCard";

function ReservationHistory({ loggedUser }) {
  const [reservations, setReservations] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("date"); // Default sorting by date
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting in ascending order

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

  const sortByPrice = () => {
    const sortedReservations = [...reservations].sort((a, b) => {
      return sortOrder === "asc" ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
    });
    setReservations(sortedReservations);
    setSortCriteria("price");
  };

  const sortByDate = () => {
    const sortedReservations = [...reservations].sort((a, b) => {
      return sortOrder === "asc" ? new Date(a.appointment.date) - new Date(b.appointment.date) : new Date(b.appointment.date) - new Date(a.appointment.date);
    });
    setReservations(sortedReservations);
    setSortCriteria("date");
  };

  const sortByDuration = () => {
    const sortedReservations = [...reservations].sort((a, b) => {
      return sortOrder === "asc" ? a.appointment.duration - b.appointment.duration : b.appointment.duration - a.appointment.duration;
    });
    setReservations(sortedReservations);
    setSortCriteria("duration");
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Render logic
  if (reservations === null) {
    // Render a loading state or a placeholder
    return <div>Loading reservations...</div>;
  }

  return (
    <div>
      {/* Sorting buttons in a row */}
      <div className="sorting-buttons-row">
        <button onClick={sortByPrice}>Sort by Price</button>
        <button onClick={sortByDate}>Sort by Date</button>
        <button onClick={sortByDuration}>Sort by Duration</button>
        <button onClick={toggleSortOrder}>
          Toggle Order ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* Reservation cards container */}
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
    </div>
  );
}

export default ReservationHistory;
  