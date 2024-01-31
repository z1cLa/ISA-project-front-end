import { useEffect, useState } from "react";
import ReservationCompanyCard from "../ui/ReservationCompanyCard";
import ReservationCompanyUserCard from "../ui/ReservationCompanyUserCard";
import "./CompanyReservations.css";

function CompanyReservationsUserList({ loggedUser }) {
  const [reservations, setReservations] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const getCompanyId = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/company/companyId/${loggedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCompanyId(data);
        } else {
          console.error("Failed to get company ID for user");
          // Optionally, set companyId to a default value or an error state
          setCompanyId(null);
        }
      } catch (error) {
        console.error("Error getting company ID", error);
        // Optionally, set companyId to a default value or an error state
        setCompanyId(null);
      }
    };

    getCompanyId();
  }, [loggedUser.id]);

  useEffect(() => {
    if (companyId !== null) {
      const fetchReservations = async () => {
        try {
          const response = await fetch(
            `http://localhost:8090/api/v1/reservation/company/${companyId}`,
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
            console.error("Failed to fetch reservations for company");
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
    }
  }, [companyId]);

  // Render logic
  if (reservations === null) {
    // Render a loading state or a placeholder
    return <div>Loading reservations...</div>;
  }

  return (
    <div className="reservations-container">
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <ReservationCompanyUserCard
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

export default CompanyReservationsUserList;
