import React from "react";
import { Link } from "react-router-dom"; // assuming you're using react-router

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Access Denied</h1>
      <p style={styles.text}>You do not have permission to view this page.</p>
      <div style={styles.instructions}>
        <p>Please check with your administrator or:</p>
        <ul>
          <li>
            <Link to="/" style={styles.link}>
              Go to the Homepage
            </Link>
          </li>
          <li>
            <Link to="/login" style={styles.link}>
              Sign in with a different account
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Just some simple inline styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  header: {
    fontSize: "2.5rem",
    color: "#333",
  },
  text: {
    fontSize: "1.2rem",
    margin: "20px 0",
  },
  instructions: {
    margin: "30px 0",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Unauthorized;
