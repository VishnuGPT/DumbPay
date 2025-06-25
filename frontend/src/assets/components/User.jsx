import React,{useState} from 'react'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import NormalLoading from './NormalLoading'

const User = (props) => {
  const[loading,setloading]=useState(false)
  const Navigate = useNavigate()
  function handleclick() {
    setloading(true)
    setTimeout(() => {
      setloading(false)
      Navigate('/send', {
        
        state: {
          firstname: props.firstname,
          lastname: props.lastname,
          toid: props.id
        }

      })
    }, 1000);
    console.log(props.id)


  }
  return (
    <>
    <div className='flex justify-between p-5 border-2  items-center m-2 border-white'>
      <div className='flex items-center gap-2'>
        <FaUser size={24} color='white' />
        <h1 className='text-white font-bold text-xl'>{props.firstname} {props.lastname}</h1>
      </div>
      <button onClick={handleclick} className='border-white border-2 transition transform active:scale-75 duration-200 cursor-pointer rounded-2xl bg-black text-white text- xl font-bold px-4 py-3 hover:bg-white hover:text-black'>Send Money</button>
    </div>
    {loading && <NormalLoading/> }
    </>
  )
}

export default User
