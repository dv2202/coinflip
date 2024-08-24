import React from "react";

const Login = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-white flex justify-center items-center flex-col gap-[50px]">
      <h2 className="font-semibold text-[7rem] text-center">
        Welcome to CoinFlip
      </h2>
        <div className="w-full flex flex-col items-center justify-center gap-2">
        <p className="text-lg text-gray-700 text-center">
                Click the button below to connect your MetaMask and start playing
            </p>
            <button className="rounded-md p-3 bg-blue-700 text-white font-medium justify-center items-center flex">
                Connect to wallet
            </button>
        </div>
    </div>
  );
};

export default Login;
