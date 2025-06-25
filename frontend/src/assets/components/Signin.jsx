import React,{useState} from 'react'
import Input from './Input'
import Heading from './Heading'
import Button from './Big_Button'
import { useNavigate } from 'react-router-dom'
import Small_error from './SError'
import NormalLoading from './NormalLoading'
import axios from 'axios'
import { url } from '../../../config';

const Signin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [loading, setloading] = useState(false)
    const Navigate = useNavigate()
    const [error, seterror] = useState(false)
    const [errorname, seterrorname] = useState('Something Went Really Wrong')
    const handleSubmit = async () => {
        setloading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const res = await axios.post(`${url}/api/v1/user/signin`, formData);
            console.log(res.data);
            localStorage.setItem('authToken', res.data.token);
            Navigate('/dashboard')
        } catch (err) {
            if(err){
                console.log(err)
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
        <div className='bg-gray-400 min-h-screen w-full flex md:items-center justify-center shadow-md '>
            <div className='bg-white w-[100%] h-[70vh] rounded-2xl p-5 md:w-[30%] md:h-[70vh] '>
                <Heading heading="Sign In" subheading="Enter your information to access your account" />
                <Input onChange={handleChange} name="username" value={formData.username} heading="Email" placeholder="vishnu@gmail.com" />
                <Input onChange={handleChange} name="password" value={formData.password} heading="Password" placeholder="" />
                <div className='flex flex-col gap-3'>
                    <div className='flex justify-center items-center'>
                        <Button onClick={handleSubmit} name="Sign In" />
                    </div>
                    <div className='flex gap-2 justify-center items-center]'>
                        <h1>Don't Have an Account?</h1>
                        <button onClick={()=>{
                            setloading(true)
                            setTimeout(()=>{Navigate('/signup')
                                setloading(false)
                            },1000)}} className='underline animate-bounce cursor-pointer transition transform active:scale-95' >Sign Up</button>
                    </div>
                    <div onClick={()=>{
                        setloading(true)
                        setTimeout(() => {
                            setloading(false)
                            Navigate('/about')
                        }, 2000);
                    }} className='flex justify-center'> <button className='rounded-2xl cursor-pointer border-2 border-black py-2 w-[30%] lg:w-[40%] transition transform active:scale-70'>Go Back</button></div>
                    
                    {error && <Small_error error={errorname}/>}
                    {loading && <NormalLoading/>}

                </div>
            </div>
        </div>
    )
}

export default Signin
