import React, { useState, useEffect, createContext, useContext } from "react";
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [ isUserDatasUpdated, setIsUserDatasUpdated ] = useState(false)

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const res = await axios.post("https://quilog-server.vercel.app/infos/users", { userId: userId });
          setUser(res.data.user);
          setIsUserLoggedIn(false);
          setIsUserDatasUpdated(false)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [ isUserLoggedIn, isUserDatasUpdated ]);

  return (
    <UserContext.Provider value={{ user, isUserLoggedIn, setUser, setIsUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
