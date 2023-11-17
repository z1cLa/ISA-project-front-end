import React, { useState, useEffect } from "react";
import "./UpdateCompany.css"; 
import Navbar from "../ui/Navbar";
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const EditCompany = () => {
    const [formData, setFormData] = useState({
      companyName: "",
      address: "",
      description: "",
      averageGrade: "",
      appointmentId: ""
    });

    toastr.options = {
        positionClass: 'toast-top-right',
        hideDuration: 300,
        timeOut: 3000,
        closeButton: true,
      };

    //const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyId = 1; //for now
        const response = await fetch(`http://localhost:8090/api/v1/company/${companyId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();

        setFormData({
          companyName:userData.companyName || "",
          address:userData.address || "", 
          description: userData.description || "",
          averageGrade: userData.averageGrade || "",

        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanyData();
  }, []); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyId = 1;
    await fetch(`http://localhost:8090/api/v1/company/update/${companyId}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    toastr.success('Updated')
  };

  return(
<>
<Navbar />
<div className="form-container">
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
    <div className="form-group">
      <input
        type="text"
        name="averageGrade"
        value={formData.averageGrade}
        onChange={handleChange}
        required
      />
      <label>Average grade</label>
    </div>


    <div className="center">
      <button type="submit" className="form-submit-btn">Update</button>
    </div>
  </form>
</div>


</>
  );

};

export default EditCompany;