import React, { useContext, useState } from 'react';

type AppContextProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Function;
};
const AppContext = React.createContext<Partial<AppContextProps>>({});

const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };
