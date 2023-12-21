import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewAppointment = ({ selectedEquipment }) => {
  const { companyId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ date: "" });

  const [avialableTimes, setAvialableTimes] = useState(["16:00:00"]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("url-koji-coa-debeli-nije-napravio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, companyId }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvialableTimes(data);
        console.log("Reservation created successfully:", data);
      } else {
        const errorData = await response.json();
        console.error(
          "Error creating reservation:",
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const onNewAppointmentTimeSelect = async (time) => {
    console.log(time);
    console.log(formData.date);
    console.log(selectedEquipment);

    try {
      const response = await fetch("url-koji-coa-debeli-nije-napravio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          companyId,
          equipment: [...selectedEquipment],
          time,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Reservation created successfully:", data);
        navigate("coa");
      } else {
        const errorData = await response.json();
        console.error(
          "Error creating reservation:",
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
            required
          />
          <label>Date</label>
        </div>
        <div className="center">
          <button type="submit" className="form-submit-btn">
            Get available times
          </button>
        </div>
      </form>
      <ul>
        {avialableTimes &&
          avialableTimes.map((time) => (
            <li key={time}>
              <span>{time}</span>
              <button onClick={() => onNewAppointmentTimeSelect(time)}>
                Reserve
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NewAppointment;
