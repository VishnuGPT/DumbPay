import React, { useState } from 'react'
import Input from './Input'
import Button from './Big_Button'
import Heading from './Heading'
import axios from 'axios'
import NormalLoading from './NormalLoading'
import Small_error from './SError'
import { useNavigate } from 'react-router-dom'
import { url } from '../../../config';


const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: ''
    });
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(false)
    const [errorname, seterrorname] = useState('Something Went Really Wrong')
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async () => {
        setloading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const res = await axios.post(`${url}/api/v1/user/signup`, formData);
            console.log(res.data);
            localStorage.setItem('authToken', res.data.token);
            navigate('/dashboard')

        } catch (err) {
            if(err){
                seterrorname(err.response?.data.message)
                seterror(true)
            }
            else{
                seterrorname("Something went really bad but no need to worry!!")
                seterror(true)
            }
        } finally {
            setloading(false)
        }

    };



    return (

        <div className='bg-gray-400 min-h-screen w-full flex items-center justify-center shadow-md '>
            <div className='bg-white w-[100%] h-screen rounded-2xl p-5 md:w-[30%] md:h-[80%] '>
                <Heading heading="Sign Up" subheading="Enter your information to create an account" />
                <Input name="firstname" onChange={handleChange} value={formData.firstname} heading="First Name" placeholder="Vishnu" />
                <Input name="lastname" onChange={handleChange} value={formData.lastname} heading="Last Name" placeholder="Gupta" />
                <Input name="username" onChange={handleChange} value={formData.username} heading="Email" placeholder="vishnu@gmail.com" />
                <Input name="password" onChange={handleChange} value={formData.password} heading="Password" placeholder="Atleast 6 Character Required" />
                <div className='flex flex-col gap-3'>
                    <div className='flex justify-center items-center'>
                        <Button onClick={handleSubmit} name="Sign Up" />
                    </div>
                    {loading && <NormalLoading />}
                    <div className='flex gap-2 justify-center items-center'>
                        <h1>Already Have an Account?</h1>
                        <button  onClick={()=>{
                            setloading(true)
                            setTimeout(()=>{navigate('/signin')
                                setloading(false)
                            },1000)}} className='underline animate-bounce cursor-pointer transition transform active:scale-95' >Sign in</button>
                    </div>
                    <div onClick={()=>{
                        setloading(true)
                        setTimeout(() => {
                            setloading(false)
                            navigate('/')
                        }, 2000);
                    }} className='flex justify-center'> <button className='rounded-2xl cursor-pointer border-2 border-black py-2 w-[30%] lg:w-[40%] transition transform active:scale-70'>Go Back</button></div>
                    {error && <Small_error error={errorname}/>}
                </div>
            </div>
        </div>
    )
}

export default Signup
