import React from 'react'
import Input from './Input'
import { useState } from 'react'
import NormalLoading from './NormalLoading'
import axios from 'axios'
import Small_error from './small_error'
import { url } from '../../../config';
import Error from './Error'

const Updatauser = (props) => {
    const[errorname,seterrorname]= useState('Something Went Wrong')
    const [error, seterror] = useState(false)
    const [form, setform] = useState({
        firstname: "",
        lastname: "",
        password: ""
    })
    const [loading, setloading] = useState(false)

    function handlechange(e) {
        setform({
            ...form,
            [e.target.name]: e.target.value
        }
        )
    }
    async function handleclick() {
        setloading(true);

        const filteredForm = Object.fromEntries(
            Object.entries(form).filter(([key, value]) => value && value.trim() !== "")
        );

        try {
            const res = await axios.put(`${url}/api/v1/update`, filteredForm, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`,
                }
            });
            console.log("Updated successful:", res.data);
            setloading(false);
            props.setclicked(false);
        } catch (e) {
            console.error("Error:", e);
            seterror(e.response.data || "Something went wrong");
            seterrorname(e.response.data.message)
            seterror(true);
            setloading(false);
            setTimeout(() => {
                seterror(false)
            }, 1000);
        }
    }



    return (
        <>
            <div className=' absolute flex flex-col items-center inset-0 bg-white/60 backdrop-blur-md p-10'>
                <h1 className='text-4xl font-extrabold text-center'>Update User Profile</h1>
                <Input onChange={handlechange} name="firstname" value={form.firstname} heading="First Name" placeholder="New Name(Atleast 3 Character Required)" />
                <Input onChange={handlechange} name="lastname" value={form.lastname} heading="Last Name" placeholder="New Name(Atleast 3 Character Required)" />
                <Input onChange={handlechange} name="password" value={form.password} heading="Password" placeholder="New Password(Atleast 6 Character Required)" />
                <button onClick={handleclick}  className='m-5 w-[60vw] lg:w-[30vw] px-6 py-3 hover:bg-green-300 cursor-pointer transition transform active:scale-75 font-bold text-2xl border-2 border-green-300 rounded-2xl'>Update Profile</button>
                <button onClick={() => {
                    setloading(true)
                    setTimeout(() => {
                        props.setclicked(false)
                        setloading(false)
                    }, 1000)
                }} className=' w-[35vw] lg:w-[30vw] px-3 h-[8vh]  hover:bg-black  hover:text-white cursor-pointer transition transform active:scale-75 duration-150 font-bold text-2xl border-2 border-black-300 rounded-2xl'>Go Back</button>

            </div>
            {error && <Error error={errorname} />}
            {loading && <NormalLoading />}
        </>
    )
}

export default Updatauser
