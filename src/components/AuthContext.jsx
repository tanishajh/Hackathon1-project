import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const AuthContext = ({ children }) => {
  const [userdata, setuserdata] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : null
  );
  const [username, setusername] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).username
      : ""
  );
  const value = { userdata, setuserdata, username, setusername };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const themehook = () => {
  const context = useContext(Context);
  return context;
};

export default themehook;
