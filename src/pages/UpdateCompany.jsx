import React, { useState, useEffect } from "react";
import "./UpdateCompany.css";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth"

const EditCompany = () => {
  const { loggedUser } = useAuth();
  const [companyId, setCompanyId] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    description: "",
    averageGrade: "",
    appointmentId: "",
  });

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  //const [errors, setErrors] = useState({});

  useEffect(() => {
    const getCompanyId = async () => {
      const response = await fetch(`http://localhost:8090/api/v1/company/companyId/${loggedUser.id}`),
      ;
      const data = await response.json();
      setCompanyId(data);
      //alert(data);
    };
    getCompanyId();
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Proveri da li companyId ima vrednost pre nego što izvršiš zahtev
        if (companyId) {
          const response = await fetch(
            `http://localhost:8090/api/v1/company/${companyId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
  
          if (!response.ok) {
            throw new Error(`Failed to fetch company data: ${response.statusText}`);
          }
  
          const companyData = await response.json();
  
          setFormData({
            companyName: companyData.companyName || "",
            address: companyData.address || "",
            description: companyData.description || "",
            averageGrade: companyData.averageGrade || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCompanyData();
  }, [companyId]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert(companyId);
    await fetch(`http://localhost:8090/api/v1/company/update/${companyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    toastr.success("Company updated successful");
    navigate("/company");
  };

  return (
    <>
      <div className="form-container">
      {/* <h1>{userId}</h1> */}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <label>Company name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <label>Address</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <label>Description</label>
          </div>

          <div className="center">
            <button type="submit" className="form-submit-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCompany;
