import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // console.log(user);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    // console.log(userInfo);
    if (userInfo) {
      setUser(user);
      // console.log(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
