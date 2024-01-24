import { useEffect, useState } from "react";
import ReservationCard from "../ui/ReservationCard";
import "./UserReservations.css";

function UserReservations({ loggedUser }) {
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/reservation/user/${loggedUser.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
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
          <ReservationCard
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

export default UserReservations;
