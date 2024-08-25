import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { flipCoin } from '../utils/flipCoin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBalance } from '../contexts/BalanceContext';

const Home = () => {
  const [selectedSide, setSelectedSide] = useState("");
  const [investment, setInvestment] = useState(0.01); // Default investment set to 0.01
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState("");
  const [isReset, setIsReset] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false); // New state
  const { balance, updateBalance } = useBalance();
  const [betHistory, setBetHistory] = useState([]); // State to store the bet history

  const handleIncrement = () => {
    if (investment + 0.01 <= balance) {
      setInvestment(prev => +(prev + 0.01).toFixed(2)); 
      setInsufficientBalance(false);
    }
  };

  const handleDecrement = () => {
    if (investment > 0.01) {
      setInvestment(prev => +(prev - 0.01).toFixed(2)); 
      setInsufficientBalance(false);
    }
  };

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);

    if (e.target.value === "") {
      setInvestment("");
      setInsufficientBalance(false);
      return;
    }

    if (value < 0) {
      setInvestment(0);
      setInsufficientBalance(false);
      return;
    }

    if (value <= balance) {
      setInvestment(value);
      setInsufficientBalance(false);
    } else {
      setInvestment(value);
      setInsufficientBalance(true);
    }
  };

  const handleClickBet = (side) => {
    if (!isReset) return;

    if (investment > balance) {
      toast.error("Insufficient balance!");
      return;
    }
    setSelectedSide(side);
    setFlipping(true);
    setIsReset(false);
    updateBalance(-investment);

    setTimeout(() => {
      const flipResult = flipCoin();
      setResult(flipResult);
      setFlipping(false);
      setToastVisible(true);

      const betOutcome = flipResult === side ? 'Win' : 'Loss';
      const newBet = {
        side,
        result: flipResult,
        investment,
        outcome: betOutcome
      };

      setBetHistory(prevHistory => {
        const updatedHistory = [newBet, ...prevHistory];
        return updatedHistory.slice(0, 5); // Keep only the last 5 bets
      });

      if (betOutcome === 'Win') {
        toast.success("You won!");
        updateBalance(investment * 2);
      } else {
        toast.error("You lost!");
      }
    }, 4000);
  };

  const handleReset = () => {
    setSelectedSide("");
    setResult("");
    setFlipping(false);
    setIsReset(true);
    setToastVisible(false);
    setInsufficientBalance(false);
  };

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        handleReset();
        setToastVisible(false);
      }, 6000);
    }
  }, [toastVisible]);

  return (
    <>
      <Navbar />
      <div className="w-[100vw] h-screen flex flex-row px-6 overflow-y-hidden">
        {/* Main Section: Centered Circle */}
        <div className="w-[90%] h-[600px] flex flex-col items-center justify-between py-9">
          <div className="w-[300px] h-auto p-4 bg-[#2B2F42] rounded-md text-white text-center">
            {selectedSide ? (
              <div>You have selected {selectedSide}</div>
            ) : (
              <div>You have not selected any side</div>
            )}
          </div>
          {flipping ? (
            <div className={`coin ${flipping ? "flipping" : ""}`}>
              <div className="flex flex-col"></div>
            </div>
          ) : (
            <div className="w-[20rem] h-[20rem] bg-[#FAB005] rounded-full border-[#FFD53D] border-[20px] flex items-center justify-center">
              <div className="flex flex-col ">
                <p className={`text-[#FFD53D] font-bold text-[10rem] ${result ? "" : "invisible"}`}>
                  {result === "Head" ? "H" : result === "Tail" ? "T" : ""}
                </p>
              </div>
            </div>
          )}
          <div className="w-[200px]"></div>
        </div>
        {/* Right Side */}
        <div className="w-[200px] h-fit bg-gray-100 p-3 rounded-md">
          <div className="flex flex-col items-center rounded-md w-full">
            <div className="text-gray-400 text-sm mb-2 items-start w-full">Investment</div>
            <div className="w-full flex items-center justify-between bg-[#2B2F42] rounded-md px-4 py-2 border border-gray-600">
              <button className="text-gray-400 text-2xl mr-4" onClick={handleDecrement}>
                -
              </button>
              <input
                className="text-white text-lg bg-transparent text-center w-full focus:none outline-none" // Minimal or no styling
                type="number"
                value={investment}
                min="0.0"
                step="0.01"
                onChange={handleInputChange}
              />
              <button className="text-gray-400 text-2xl ml-4" onClick={handleIncrement}>
                +
              </button>
            </div>
            {insufficientBalance && (
              <div className="text-red-500 text-sm mt-2 text-center">
                You have insufficient balance.
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-[10px] mt-4">
            <button className="bg-[#28be6e] text-white px-4 py-2 rounded-md font-medium w-full" onClick={() => handleClickBet("Head")}>
              Bet on Heads
            </button>
            <div className="text-[13px] leading-[18px] w-full text-center items-center text-black justify-between">Your payout: {2 * investment}</div>
            <button className="bg-[#DB4636] text-white px-4 py-2 rounded-md font-medium w-full" onClick={() => handleClickBet("Tail")}>
              Bet on Tails
            </button>
            <button className="bg-[#007BFF] text-white px-4 py-2 rounded-md font-medium w-full mt-4" onClick={handleReset}>
              Reset
            </button>
          </div>
          {/* Display Bet History */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-center mb-4">Bet History</h2>
            <div className="list-disc flex flex-col gap-1">
              {betHistory.map((bet, index) => (
                <div
                  key={index}
                  className={`text-sm ${bet.outcome === 'Win' ? 'bg-green-500' : 'bg-red-500'} rounded-md p-2`}
                >
                  Bet on <strong>{bet.side}</strong> with {bet.investment} ETH - Result: {bet.result} ({bet.outcome})
                  {bet.outcome === 'Win' ? ` You won ${bet.investment * 2} ETH` : `You Loss ${bet.investment} ETH`}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
      
      <style jsx>{`
        .coin {
          width: 20rem;
          height: 20rem;
          background-color: #fab005;
          border-radius: 50%;
          border: 20px solid #ffd53d;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 4s;
          transform-style: preserve-3d;
        }

        .coin.flipping {
          animation: flip 4s;
        }

        @keyframes flip {
          0% {
            transform: rotateY(0);
          }
          50% {
            transform: rotateY(1800deg); 
          }
          100% {
            transform: rotateY(3600deg); 
          }
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield; /* For Firefox */
        }
      `}</style>
    </>
  );
};

export default Home;
