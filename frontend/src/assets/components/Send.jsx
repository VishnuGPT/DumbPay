import React, { useState } from 'react'
import Input from './Input'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NormalLoading from './NormalLoading'
import Confirmation from './Confirmation'
import { url } from '../../../config';
import { useEffect } from 'react';
import Error from './Error';

const Send = () => {
    const [error, seterror] = useState(false)
    const [errorname, seterrorname] = useState('Something Went Wrong')

    const location = useLocation();
    const { firstname, lastname, toid } = location.state || {};

    const Navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState(false)
    const [amount, setamount] = useState(false)
    const body = {
        'to': toid,
        'amount': Number(amount)
    }

    async function handleclick() {
        setloading(true)
        try{const res = await axios.post(`${url}/api/v1/account/transfer`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        if (res.data.message == "Transfer successful") {
            setTimeout(() => {
                setloading(false)
                setstatus(true)
                setTimeout(() => {
                    setstatus(false)
                    Navigate('/Dashboard')
                }, 2000)

            }, 1000);
        }}catch(e){
            console.log(e.response.data.message)
            setloading(false)
            seterror(true)
            seterrorname(e.response.data.message)
            setTimeout(() => {
                seterror(false)
                Navigate('/Dashboard')
            }, 2000)
            
        }



    }


    return (
        <>
            <div className='flex flex-col items-center gap-2.5 p-2.5' >
                <div className='text-2xl'>Send Money to {firstname} {lastname}</div>
                <div>
                    <div className='py-4 px-3 mx-auto w-[100vw] flex flex-col gap-2 lg:w-[50vw]'>
                        <h1 className='text-2xl font-semibold'>Total Amount To Send</h1>
                        <input onChange={(e) => (setamount(e.target.value))} value={amount} type="Number" placeholder="Enter the Amount" className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className='w-[80vw] rounded-2xl text-center mx-auto bg-green-400 text-2xl text-white font-bold transition transform active:scale-75 duration-150 hover:bg-green-600 cursor-pointer py-4 px-6 lg:w-[10vw]' onClick={handleclick}>Send</button>
                        <button className='rounded-2xl py-2 cursor-pointer text-center bg-black text-white hover:bg-gray-500 hover:text-black text-xl font-bold transition transform active:scale-75 duration-150' onClick={() => {
                            setTimeout(() => {
                                Navigate('/Dashboard')
                            }, 1000);
                        }}>Go back to Dashboard</button>
                    </div>
                </div>
            </div>
            {error && <Error error={errorname} />}
            {loading && <NormalLoading />}
            {status && <Confirmation />}
        </>
    )

}
export default Send
