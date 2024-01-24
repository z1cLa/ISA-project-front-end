import React, { useState, useEffect } from "react";
import "./SearchEquipment.css";
import Navbar from "../ui/Navbar"; // Import the Navbar component

const SearchEquipment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipmentList, setEquipmentList] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [companyDetails, setCompanyDetails] = useState({});

  useEffect(() => {
    // Fetch all equipment data from the server
    const fetchEquipment = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/api/v1/equipment/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEquipmentList(data);
        } else {
          console.error("Failed to fetch equipment");
        }
      } catch (error) {
        console.error("Error fetching equipment", error);
      }
    };

    fetchEquipment();
  }, []);

  useEffect(() => {
    // Fetch company details for all equipment
    const fetchCompanyDetails = async () => {
      const details = {};
      await Promise.all(
        equipmentList.map(async (equipment) => {
          try {
            const response = await fetch(
              `http://localhost:8090/api/v1/company/${equipment.companyId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.ok) {
              const companyData = await response.json();
              details[equipment.id] = companyData.companyName;
            } else {
              console.error(
                `Failed to fetch company details for equipment ID: ${equipment.id}`
              );
            }
          } catch (error) {
            console.error("Error fetching company details", error);
          }
        })
      );
      setCompanyDetails(details);
    };

    fetchCompanyDetails();
  }, [equipmentList]);

  const handleSearch = () => {
    // Filter equipment based on the search term
    const filtered = equipmentList.filter((equipment) =>
      equipment.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEquipment(filtered);
  };

  const handleSort = (criteria) => {
    // Toggle sortOrder if the same criteria is clicked again
    setSortOrder((prevOrder) =>
      sortBy === criteria ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortBy(criteria);
    // Sort the already filtered equipment
    const sorted = [...filteredEquipment].sort((a, b) => {
      const aValue = a[criteria];
      const bValue = b[criteria];

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
    setFilteredEquipment(sorted);
  };

  return (
    <div>
      <div className="search-equipment-container">
        <div className="form-group">
          <label>Search Equipment:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="sort-options">
          <button onClick={() => handleSort("equipmentPrice")}>
            Sort by Price {sortBy === "equipmentPrice" && `(${sortOrder})`}
          </button>
          <button onClick={() => handleSort("equipmentType")}>
            Sort by Type {sortBy === "equipmentType" && `(${sortOrder})`}
          </button>
        </div>

        <div className="equipment-list">
          {filteredEquipment.map((equipment) => (
            <div key={equipment.id} className="equipment-item">
              <p>Name: {equipment.equipmentName}</p>
              <p>Type: {equipment.equipmentType}</p>
              <p>Description: {equipment.equipmentDescription}</p>
              <p>Price: {equipment.equipmentPrice}</p>
              <p>Company: {companyDetails[equipment.id]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchEquipment;
