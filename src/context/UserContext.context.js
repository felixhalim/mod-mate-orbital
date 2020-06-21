import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [login, isLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={[login, isLoggedIn]}>
      {props.children}
    </UserContext.Provider>
  );
};
