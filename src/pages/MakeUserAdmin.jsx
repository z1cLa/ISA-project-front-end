import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.css";

const MakeUserAdmin = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/v1/auth/all");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleMakeAdmin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/users/${selectedUserId}/make-admin`,
        {
          method: "POST", // Assuming the endpoint supports PUT method
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        console.log("User made admin successfully");
        toastr.success("User made admin successfully");
      } else {
        console.error("Failed to make user admin");
      }
    } catch (error) {
      console.error("Error making user admin", error);
    }
  };

  return (
    <>
      <div className="make-admin-container">
        <label>Select User:</label>
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value={null}>Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>

        <button onClick={handleMakeAdmin}>Make Admin</button>
      </div>
    </>
  );
};

export default MakeUserAdmin;
