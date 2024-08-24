
import React, { createContext, useContext, useState } from 'react';


const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(100); 

  const updateBalance = (amount) => {
    debugger
    setBalance(prevBalance => prevBalance + amount);
  };

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  return useContext(BalanceContext);
};
