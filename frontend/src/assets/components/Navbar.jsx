import React,{useState} from 'react'
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
  function handleclick(){
    setclicked(true)
  }
  return (
    <>
    <div className='flex items-center justify-between border-2 border-black p-5 rounded-2xl'>
      <h1 className='text-2xl font-bold '>LuckPay WebApp</h1>
      <div className='flex flex-wrap justify-center items-center gap-2'>
        <button  className='flex gap-2 px-6 py-4 text-xl items-center cursor-pointer transition transform active:scale-90 duration-150 hover:bg-blue-200 border-blue-500 border-2 rounded-2xl' onClick={()=>{
          setloading(true)
          setTimeout(() => {
            setloading(false)
            Navigate('/transaction')
          }, 1000);
        }}>Transaction History</button>
        <button onClick={handleclick} className='flex gap-2  px-6 py-4  items-center cursor-pointer transition transform active:scale-90 duration-150 hover:bg-blue-200 border-blue-500 border-2 rounded-2xl'>
          <h1 className='text-xl'>Hello, {props.firstname}</h1>
          <FaUser size={24}/>
        </button>
         <LogoutButton/>
      </div>
    </div>
    {clicked && <Updatauser setclicked={setclicked}/>}
    {loading && <NormalLoading/>}
    </>
  )
}

export default Navbar
