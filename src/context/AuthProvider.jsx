import React, { createContext, useState, useEffect } from "react";
import { getLoggedUser } from "../utils/getLoggedUser"; // Your async function

const AuthContext = createContext({
  loggedUser: null,
  setLoggedUser: () => {},
});

export const AuthProvider = ({ children, loggedUserParam }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getLoggedUser(); // Replace with actual API call
        setLoggedUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [loggedUserParam]);

  return (
    <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
