import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useAccount } from "../contexts/AccountContext";
import { useNavigate } from "react-router-dom";
import { useBalance } from "../contexts/BalanceContext";
const Login = () => {
  const { account, setAccount } = useAccount();
  const { balance, updateBalancefromWallet } = useBalance();
  const navigate = useNavigate(); 

  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.requestAccounts();
        const selectedAccount = accounts[0];
        const balance = await web3Instance.eth.getBalance(selectedAccount);
        const balanceInEther = web3Instance.utils.fromWei(balance, "ether");
        const chainId = await web3Instance.eth.getChainId();
        updateBalancefromWallet(balanceInEther);
        setAccount({
          address: selectedAccount,
          balance: balanceInEther,
          chainId: chainId,
        });
        navigate("/home");
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  console.log(account);

  return (
    <div className="w-[100vw] h-[100vh] bg-white flex justify-center items-center flex-col gap-[50px]">
      <h2 className="font-semibold text-[7rem] text-center">
        Welcome to CoinFlip
      </h2>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <p className="text-lg text-gray-700 text-center">
          Click the button below to connect your MetaMask and start playing
        </p>
        <button
          className="rounded-md p-3 bg-blue-700 text-white font-medium justify-center items-center flex"
          onClick={connectWallet}
        >
          Connect to wallet
        </button>
      </div>
    </div>
  );
};

export default Login;
