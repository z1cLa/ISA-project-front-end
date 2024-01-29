import { useEffect, useState } from "react";
import ReservationCard from "../ui/ReservationCardAccept";
import "./UserReservations.css";

function TakingEquipment({ loggedUser }) {
  const [reservations, setReservations] = useState(null);

  // Function to fetch reservations
  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/reservation/in-progress`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

  // Function to update reservation status and penalty points
  const updateReservationStatusAndPenaltyPoints = async () => {
    try {
      // Make a POST request to update reservation status
      const updateResponse = await fetch(
        'http://localhost:8090/api/reservations/update-status',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (updateResponse.ok) {
        console.log('Reservation status updated successfully');
        // Fetch reservations again after updating status
        fetchReservations();
      } else {
        console.error('Error updating reservation status:', updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error updating reservation status:', error.message);
    }
  };

  useEffect(() => {
    // Fetch reservations when the component mounts
    fetchReservations();

    // // Update reservation status and penalty points when the component mounts
    // updateReservationStatusAndPenaltyPoints();

    // // Set up an interval to update reservation status and penalty points periodically
    // const updateInterval = setInterval(() => {
    //   updateReservationStatusAndPenaltyPoints();
    // }, 60000); // Adjust the interval as needed (in milliseconds)

    // // Clean up the interval when the component unmounts
    // return () => clearInterval(updateInterval);
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

export default TakingEquipment;
