import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "./AddAppointment.css";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.css";

const AppointmentForm = ({ loggedUser }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    duration: "",
    isCompaniesAppointment: "true",
    isReserved: "false",
    company: {
      id: "",
      companyName: "",
      address: "",
      description: "",
      averageGrade: "",
    },
    user: {
      // id: "",
      // firstName: "",
      // lastName: "",
      // email: "",
      // password: "",
      // phoneNumber: "",
      // country: "",
      // city: "",
      // profession: "",
      // companyInfo: "",
      // role: "",
      // verificationCode: "",
      // verified: true,
    },
  });

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  const [companyId, setCompanyId] = useState(null);
  useEffect(() => {
    const getCompanyId = async () => {
      const response = await fetch(`http://localhost:8090/api/v1/company/companyId/${loggedUser.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      const data = await response.json();
      setCompanyId(data);
      //alert(data);
    };
    getCompanyId();
  }, []);
  

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyResponse = await fetch(
          `http://localhost:8090/api/v1/company/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (companyResponse.ok) {
          const companyData = await companyResponse.json();
          setFormData((prevData) => ({
            ...prevData,
            company: companyData,
          }));
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    // Fetch user data by ID
    const fetchUserData = async () => {

      setFormData((prevData) => ({
        ...prevData,
        user: loggedUser,
      }));
    };

    // Call the fetch functions
    fetchCompanyData();
    fetchUserData();
  }, [companyId]); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const selectedDate = new Date(formData.date);

    if (selectedDate < currentDate) {
      toastr.error("Selected date cannot be in the past");
      return; // Stop the submission if the date is in the past
    }

    try {
      const response = await fetch(
        "http://localhost:8090/api/v1/appointment/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Appointment created successfully:", data);
        toastr.success("Appointment created successfuly");
        navigate("/company");
        // Handle success (e.g., redirect to a success page)
      } else {
        const errorData = await response.json();
        console.error(
          "Error creating appointment:",
          response.statusText,
          errorData
        );
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Handle other errors
    }
  };
  return (
    <>
      <form className="forma" onSubmit={handleSubmit}>

        <label>Date:</label>
        <DatePicker
          className="ubaci1"
          name="date"
          selected={formData.date}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          required
        />

        <label>Time:</label>
        <input
          className="ubaci"
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="HH:mm:ss"
          required
        />

        <label>Duration:</label>
        <input
          className="ubaci"
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        {/* Company details */}
        <label>Company Name:</label>
        <input
          className="ubaci"
          type="text"
          name="companyName"
          value={formData.company.companyName}
          readOnly
          disabled
        />

        {/* User details */}
        <label>User Name:</label>
        <input
          className="ubaci"
          type="text"
          name="userName"
          value={`${formData.user.firstName} ${formData.user.lastName}`}
          readOnly
          disabled
        />

        <button className="dugmence" type="submit">
          Create Appointment
        </button>
      </form>
    </>
  );
};

export default AppointmentForm;
