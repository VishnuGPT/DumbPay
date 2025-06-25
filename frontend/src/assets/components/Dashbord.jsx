import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar'
import Balance from './Balance'
import axios from 'axios'
import User from './User'
import { url } from '../../../config';
const Dashbord = () => {
    
    const [username,setusername]= useState({
        firstname:'',
        lastname:''
    })
    const [balance, setbalance] = useState('')
    const [userinput, setuserinput] = useState('')
    const [users, setusers] = useState([])
    useEffect(() => {
      async function getuser() {
        const res= await axios.get(`${url}/api/v1/user/userinfo`,{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        )
        setusername(res.data.user)
      }
      getuser()
    }, [])
    
    useEffect(() => {
        async function balance() {
            try {
                const res = await axios.get(`${url}/api/v1/account/balance`, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json',
                    }

                })
                setbalance(res.data.balance)
            } catch (e) {

            }
        }
        balance()
    }, [])
    useEffect(() => {
        if(userinput==""){
            return;
        }
        const request = setTimeout(async() => {
           
            const res = await axios.get(`${url}/api/v1/user/bulk`, {
                params: {
                    "filter": userinput
                },
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`,
                }
            })
            console.log(res.data.users)
            setusers(res.data.users)

                 
        }, 500);
        return ()=>clearTimeout(request)
        
    }, [userinput])

    return (
        <div className='p-5'>
            <div >
                <Navbar firstname={username.firstname} lastname={username.lastname} />
                <Balance balance={balance} />
            </div>
            <div className='flex flex-col mx-auto items-start gap-2 '>
                <h1 className='px-2 text-2xl font-bold'>Users</h1>
                <input onChange={(e) => (setuserinput(e.target.value))} value={userinput} className=' rounded-2xl w-[100%] px-6 py-3 border-blue-500 border-2' type='text' placeholder="Search users...(Vishnu Gupta is always a user:-))" />
            </div>
            <div className='bg-black'>
            {users.map((e) => {
                return <User firstname={e.firstname} lastname={e.lastname} key={e._id} id={e._id} />
            })}
            </div>
        </div>
    )
}

export default Dashbord
