import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';

type AppContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
const AppContext = React.createContext<Partial<AppContextProps>>({});
const useAppContext = () => useContext(AppContext);
const AppProvider = ({ children }) => {
  const jwt = Cookies.get('jwt');
  const [isLoggedIn, setIsLoggedIn] = useState(jwt !== undefined);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };
