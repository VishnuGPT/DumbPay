import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import Updatauser from './Updatauser';
import LogoutButton from './Logout';
import Transactions from './Transactions';
import { useNavigate } from 'react-router-dom';
import NormalLoading from './NormalLoading'

const Navbar = (props) => {
  const [loading, setloading] = useState(false)
  const Navigate = useNavigate()
  const [clicked, setclicked] = useState(false)
  function handleclick() {
    setclicked(true)
  }
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between border-2 border-black p-4 rounded-2xl bg-white shadow-md gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-center sm:text-left text-black">LuckPay WebApp</h1>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3">
          <button
            className="flex gap-2 px-5 py-3 text-base sm:text-lg items-center cursor-pointer transition-transform duration-150 active:scale-95 hover:bg-blue-100 border-blue-500 border-2 rounded-xl shadow-sm"
            onClick={() => {
              setloading(true);
              setTimeout(() => {
                setloading(false);
                Navigate('/transaction');
              }, 1000);
            }}
          >
            Transaction History
          </button>

          <button
            onClick={handleclick}
            className="flex gap-2 px-5 py-3 items-center cursor-pointer transition-transform duration-150 active:scale-95 hover:bg-blue-100 border-blue-500 border-2 rounded-xl shadow-sm"
          >
            <span className="text-base sm:text-lg">Hello, {props.firstname}</span>
            <FaUser size={22} />
          </button>

          <LogoutButton />
        </div>
      </div>

      {clicked && <Updatauser setclicked={setclicked} />}
      {loading && <NormalLoading />}
    </>
  )
}

export default Navbar
