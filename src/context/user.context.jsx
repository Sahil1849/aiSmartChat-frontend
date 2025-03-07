import React, { createContext, useState } from "react";
import { useCurrentUser } from "../hooks/users/useCurrentUser";

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  console.log("user: ", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
