import { useEffect, useState } from "react";
import "./QRCodes.css";
import ReservationQRCode from '../ui/ReservationQRCode';

function QRCodes({ loggedUser }) {
  const [reservations, setReservations] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/reservation/userQrReservations/${loggedUser.id}`,
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
          console.error("Failed to fetch QR codes for user");
          setReservations([]);
        }
      } catch (error) {
        console.error("Error fetching QR codes", error);
        setReservations([]);
      }
    };

    fetchReservations();
  }, [loggedUser.id]);

  const filteredReservations = statusFilter
    ? reservations.filter((reservation) =>
        statusFilter === "Odbijen"
          ? ["Declined", "Canceled"].includes(reservation.status)
          : reservation.status === statusFilter
      )
    : reservations;

  useEffect(() => {
    console.log("Reservations:", reservations);
    console.log("Filtered Reservations:", filteredReservations);
  }, [reservations, filteredReservations]);

  if (reservations === null) {
    return <div>Loading reservations...</div>;
  }

  return (
    <div>
      <div className="QRCodes-list">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <ReservationQRCode key={reservation.id} reservation={reservation} />
          ))
        ) : (
          <div>No matching QR codes found.</div>
        )}
      </div>

      <div className="filter-container">
        <label className="filter-label" htmlFor="statusFilter">
        Filter by Status:
        </label>
            <select
            id="statusFilter"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
                >
                <option value="">All</option>
                <option value="In progress">Nov</option>
                <option value="Finished">Obradjen</option>
                <option value="Odbijen">Odbijen</option>
            </select>
        </div>
    </div>
  );
}

export default QRCodes;