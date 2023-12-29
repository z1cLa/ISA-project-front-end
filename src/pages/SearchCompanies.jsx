import React, { useState, useEffect } from "react";
import "./SearchCompanies.css";
import Navbar from "../ui/Navbar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

const SearchCompanies = () => {
  const [searchTermName, setSearchTermName] = useState("");
  const [searchTermPlace, setSearchTermPlace] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [searchedCompanies, setSearchedCompanies] = useState([]);
  const [filtereCompanies, setFilteredCompanies] = useState([]);
  const [filterMinGrade, setFilterMinGrade] = useState("");
  const [filterMaxGrade, setFilterMaxGrade] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all companies data from the server
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/api/v1/company/all"
        );
        if (response.ok) {
          const data = await response.json();
          setCompanyList(data);
          setSearchedCompanies(data);
          setFilteredCompanies(data);
        } else {
          console.error("Failed to fetch companies");
        }
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchCompanies();
  }, []);

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  const handleSearchByName = () => {
    const searchedByName = companyList.filter((company) =>
      company.companyName.toLowerCase().includes(searchTermName.toLowerCase())
    );
    setSearchedCompanies(searchedByName);
    setFilteredCompanies(searchedByName);
    setSearchTermPlace("");
    setFilterMinGrade("");
    setFilterMaxGrade("");
  };

  const handleSearchByPlace = () => {
    const searchedByPlace = companyList.filter((company) =>
      company.address.toLowerCase().includes(searchTermPlace.toLowerCase())
    );
    setSearchedCompanies(searchedByPlace);
    setFilteredCompanies(searchedByPlace);
    setSearchTermName("");
    setFilterMinGrade("");
    setFilterMaxGrade("");
  };

  const handleResetFilters = () => {
    setSearchedCompanies(companyList);
    setFilteredCompanies(companyList);
    setSearchTermName("");
    setSearchTermPlace("");
    setFilterMinGrade("");
    setFilterMaxGrade("");
  };

  const handleFilterByAverageGrade = () => {
    const minGrade = parseFloat(filterMinGrade);
    const maxGrade = parseFloat(filterMaxGrade);

    if (!isNaN(minGrade) && !isNaN(maxGrade)) {
      const filteredCompanies = searchedCompanies.filter(
        (company) =>
          company.averageGrade >= minGrade && company.averageGrade <= maxGrade
      );
      setFilteredCompanies(filteredCompanies);
    } else {
      console.error("Invalid input for average grade filter");
      toastr.error("Please enter min and max average grades");
    }
  };

  const handleNavigateToEquipment = (companyId) => {
    navigate(`/company/${companyId}`);
  };

  return (
    <div>
      <div className="search-companies-container">
        <div className="form-group">
          <label>Search companies by name:</label>
          <input
            type="text"
            value={searchTermName}
            onChange={(e) => setSearchTermName(e.target.value)}
          />
          <button className="search-button" onClick={handleSearchByName}>
            Search
          </button>
        </div>

        <div className="form-group">
          <label>Search companies by place:</label>
          <input
            type="text"
            value={searchTermPlace}
            onChange={(e) => setSearchTermPlace(e.target.value)}
          />
          <button className="search-button" onClick={handleSearchByPlace}>
            Search
          </button>
        </div>

        <div className="form-group">
          <label>Filter by Average Grade:</label>
          <div>
            <label>Min average grade:</label>
            <input
              type="number"
              value={filterMinGrade}
              onChange={(e) => setFilterMinGrade(e.target.value)}
            />
          </div>
          <div>
            <label>Max average grade:</label>
            <input
              type="number"
              value={filterMaxGrade}
              onChange={(e) => setFilterMaxGrade(e.target.value)}
            />
          </div>
          <button
            className="filter-button"
            onClick={handleFilterByAverageGrade}
          >
            Filter
          </button>
        </div>

        <button className="reset-button" onClick={handleResetFilters}>
          Reset
        </button>

        <div className="companies-list">
          {filtereCompanies.map((company) => (
            <div key={company.id} className="company-item">
              <p>Name: {company.companyName}</p>
              <p>Address: {company.address}</p>
              <p>Average Grade: {company.averageGrade}</p>
              <button onClick={() => handleNavigateToEquipment(company.id)}>
                View Equipment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCompanies;
