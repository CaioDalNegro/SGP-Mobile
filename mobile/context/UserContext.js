import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData?.email) {
      axios
        .get(`http://10.110.12.57:1880/reservas?email=${userData.email}`)
        .then((res) => {
          setUserData((prev) => ({
            ...prev,
            reservas: res.data || [],
          }));
        })
        .catch((err) => {
          console.error("Erro ao buscar reservas:", err);
        });
    }
  }, [userData?.email]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
