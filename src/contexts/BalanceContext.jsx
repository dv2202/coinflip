
import React, { createContext, useContext, useState } from 'react';


const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(0); 

  const updateBalance = (amount) => {
    setBalance(prevBalance => parseFloat((parseFloat(prevBalance) + parseFloat(amount)).toFixed(10)));
  };

  const updateBalancefromWallet = (amount) => {
    setBalance(amount);
  } 

  return (
    <BalanceContext.Provider value={{ balance, updateBalance, updateBalancefromWallet}}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  return useContext(BalanceContext);
};
