import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Dashbord from './Dashbord';
import NorrmalLoading from './NormalLoading'
import { url } from '../../../config';


const Protectedroute = () => {
    const [loading,setloading]= useState(true)
    const Navigate = useNavigate();
    const [safe, setsafe] = useState(false)
    useEffect(() => {
        async function verify() {
            try {
                const res =await axios.get(`${url}/api/v1/check`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json',
                    }
                })
                if(res.data=='No Access'){
                    Navigate('/signin')
                }else{
                    setsafe(true)
                    setloading(false)
                }
            } catch (e) {
                Navigate('/signin')
            }
        }verify()


    }, [])

    return (
        <> 
          {loading  && <NorrmalLoading/>}
          {safe && <Dashbord/>}
        </>
       
    )
}

export default Protectedroute
