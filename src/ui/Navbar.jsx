import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="logo" to={"/"}>
        <img
          src="https://www.gringostaco.com/wp-content/uploads/2020/04/Gringos-Logo_White-copy-1.png"
          alt="Logo"
        />
      </Link>
      <div className="nav-links">
        <Link to="/register">Register</Link>
      </div>
      <div className="nav-links">
        <Link to="/editCompany">Update company</Link>
      </div>
    </div>
  );
};

export default Navbar;
