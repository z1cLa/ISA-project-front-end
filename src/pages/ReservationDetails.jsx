import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ReservationDetails.css";
import useAuth from "../hooks/useAuth";

function ReservationDetails() {
  let { id } = useParams();

  const [reservation, setReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedUser, setLoggedUser } = useAuth();

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/reservation/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReservation(data);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservationData();
  }, [id]); // Dependency array with id to re-fetch if id changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!reservation) {
    return <div>No reservation data available.</div>;
  }

  // Extracting relevant details
  const { status } = reservation;
  const { firstName, lastName, email, phoneNumber } = reservation.user || {};
  const { date, time, duration } = reservation.appointment || {};

  // Formatting date
  const formattedDate = date ? new Date(date).toLocaleDateString() : "N/A";
  
  return (
    <div className="container">
      <h2>Reservation Details</h2>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>User:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Phone Number:</strong> {phoneNumber}
      </p>
      <p>
        <strong>Appointment Date:</strong> {formattedDate}
      </p>
      <p>
        <strong>Appointment Time:</strong> {time}
      </p>
      <p>
        <strong>Duration (hours):</strong> {duration}
      </p>

      {loggedUser?.roles[0].name.includes('ROLE_ADMIN') && (
          <button>
            Finish reservation
          </button>
      )}

    </div>
  );
}

export default ReservationDetails;
