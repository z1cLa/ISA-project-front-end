import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img
          src="https://www.gringostaco.com/wp-content/uploads/2020/04/Gringos-Logo_White-copy-1.png"
          alt="Logo"
        />
      </Link>
      <div className="nav-links">
        <Link to="/register">Register</Link>
        <Link to="/edit-account">Edit Account</Link>
        <Link to="/add-company">Add Company</Link>
        <Link to="/editCompany">Update company</Link>
        <Link to="/search-equipment">Search Equipment</Link>
        <Link to="/search-companies">Search Companies</Link>
      </div>
      <div className="nav-links">

      </div>
    </div>
  );
};

export default Navbar;
