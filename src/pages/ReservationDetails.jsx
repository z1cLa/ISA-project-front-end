import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ReservationDetails.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

function ReservationDetails() {
  let { id } = useParams();

  const [reservation, setReservation] = useState(null);
  const [equipment, setEquipment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedUser, setLoggedUser } = useAuth();
  const navigate = useNavigate();

  function calculateTotalPrice() {
    if (!equipment) {
      return 0;
    }

    return equipment.reduce((total, item) => total + item.equipmentPrice, 0);
  }

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
        console.log(data);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchEquipmentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/reservation/equipment/${id}`,
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
        setEquipment(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservationData();
    fetchEquipmentData();
  }, [id]); // Dependency array with id to re-fetch if id changes

  const acceptReservation = async (id) => {
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

      if (response.ok) {
        toastr.success("Reservation accepted succesfully");
        navigate("/");
      } else {
        console.error("Error cancelling reservation:", await response.text());
        toastr.error(
          "Reservation could not be accepted because it is not in the IN PROGRESS state"
        );
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

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
      {equipment && (
        <p>
          <strong>Equipment:</strong>
          <ul>
            {equipment.map((item, index) => (
              <li key={index}> 1x {item.equipmentName}</li>
            ))}
          </ul>
          <p>
            <strong>Total Price:</strong> ${calculateTotalPrice()}
          </p>
        </p>
      )}
      {loggedUser?.roles[0].name.includes("ROLE_ADMIN") &&
        reservation.status === "In progress" && (
          <button
            className="accept-btn"
            onClick={() => acceptReservation(reservation.id)}
          >
            Finish reservation
          </button>
        )}
    </div>
  );
}

export default ReservationDetails;
