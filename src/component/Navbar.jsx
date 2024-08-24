import React from 'react'
import { useBalance } from '../contexts/BalanceContext'

const Navbar = () => {
  const {balance} = useBalance();
    return (
    <>
      {/* Top Section: Balance and Coinbase */}
      <div className="flex justify-between items-center px-3">
        {/* Left Side: Coinbase Text */}
        <div className="text-black font-semibold text-[50px]">CoinFlip</div>
        {/* Right Side: Balance and Withdraw Button */}
        <div className="flex gap-[20px]">
            <div className="flex flex-col w-[200px] h-auto text-[12px] leading-[18px] px-2 py-1 bg-gray-100 items-start rounded-md  shadow-sm">
              <h4 className="text-[#9a9da6]  font-semibold">
                LIVE ACCOUNT
              </h4>
              <p className="text-black font-bold">{balance}</p>
            </div>
            {/* <button className="bg-[#FFD53D] text-black px-4 py-2 rounded-md font-semibold">
            Withdraw
            </button> */}
        </div>
      </div>
      </>
  )
}

export default Navbar
