import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <UserContext.Provider value={[isLoggedIn, setLogin]}>
      {props.children}
    </UserContext.Provider>
  );
};
