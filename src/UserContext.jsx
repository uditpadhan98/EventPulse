import {createContext, useEffect, useState} from "react";
import axios from "axios";
import { BASE_URL } from "./Helper";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get(`${BASE_URL}/api/profile`).then(({data}) => {
        // console.log(data);
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}