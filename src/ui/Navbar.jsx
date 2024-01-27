import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useAuth from "../hooks/useAuth";
import { getLoggedUser } from "../utils/getLoggedUser";

const Navbar = ({ loggedUserParam }) => {
  const navigate = useNavigate(); // To programmatically navigate after logout
  const { loggedUser, setLoggedUser } = useAuth();

  const handleLogout = () => {
    setLoggedUser(null); // Clear the logged user state
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img
          src="https://www.gringostaco.com/wp-content/uploads/2020/04/Gringos-Logo_White-copy-1.png"
          alt="Logo"
        />
      </Link>
      <div className="nav-links">
        
       {!loggedUser && (
        <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>    
        </div>
        )}

      {loggedUser?.roles[0].name.includes('ROLE_ADMIN') && (
              <div>
              <Link to="/add-company">Add Company</Link>
              <Link to="/company">Your company</Link>
              <Link to="/add-appointment">Add Appointment</Link>
              <Link to="/make-user-admin">Manage Admins</Link>
              </div>
      )}
        
        {loggedUser?.roles[0].name.includes('ROLE_USER') && (
              <div>
              <Link to="/edit-account">Edit Account</Link>
              <Link to="/search-equipment">Search Equipment</Link>
              <Link to="/search-companies">Search Companies</Link>

              <Link to="/user-reservations">My Reservations</Link>
              <Link to="/company-reservations">Company Reservations</Link>

              </div>
      )}

        
      </div>
      {loggedUser && (
        <div className="nav-user-info">
          <span>Welcome, {loggedUser.firstName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
