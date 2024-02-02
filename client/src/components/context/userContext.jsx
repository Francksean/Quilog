import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'


//hook personnalisé pour gérer la connexion utilisateur
export const useConnectionHandler = () => {
  const [ isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(async ()=>{

    if(isUserLoggedIn == true){
      const res = await axios.post("http://localhost:3000/", {})
    }


    return {
      isUserLoggedIn,
      setIsUserLoggedIn,
    }
  }, [isUserLoggedIn])


}


export const useContext = React.createContext({})

