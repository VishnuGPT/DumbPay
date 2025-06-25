import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import NormalLoading from './NormalLoading'
import { FaGithubSquare, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const About = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    return (
        <>

            <div className='p-6 border-8 borde-r-black '>
                {/* Header */}
                <div className='flex justify-between items-center mb-6 gap-2 '>
                    <h1 className='text-4xl font-extrabold text-black'>DumbPay WebApp</h1>
                    <div className='flex justify-center items-center flex-wrap gap-4'>
                        <button
                            onClick={() => {
                                setloading(true)
                                setTimeout(() => {
                                    setloading(false)
                                    navigate('/signin')
                                }, 1000)
                            }}
                            className=' cursor-pointer bg-black text-white px-6 py-2 rounded-2xl font-semibold transform active:scale-90 hover:scale-105 transition duration-200'
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => {
                                setloading(true)
                                setTimeout(() => {
                                    setloading(false)
                                    navigate('/signup')
                                }, 1000)
                            }}

                            className='cursor-pointer bg-black text-white px-6 py-2 rounded-2xl font-semibold transform active:scale-90 hover:scale-105 transition duration-200'
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Info Section */}
                <div className='bg-white/70 rounded-2xl shadow-lg p-6 lg:w-[90vw] mx-auto text-center'>
                    <p className='text-lg text-gray-800 mb-4 leading-relaxed'>
                        <strong>DumbPay</strong> dummy payment app built with the MERN stack by Vishnu Gupta.
                        Users can quickly create an account and are assigned a <strong>random starting balance between $0 and $1000. </strong>
                        You can search for friends by name and send them money instantly.
                    </p>
                    <ul className='text-left text-gray-700 text-base space-y-2 list-disc'>
                        <li className='hover:font-bold hover:text-xl'>Simple and fast account creation</li>
                        <li className='hover:font-bold hover:text-xl'>Smart user search by name</li>
                        <li className='hover:font-bold hover:text-xl'>Instant money transfers with real-time balance updates</li>
                        <li className='hover:font-bold hover:text-xl'>Track Your Transaction History with real-time payment tracker</li>
                        <li className='hover:font-bold hover:text-xl'>Single Page Application, no reloads</li>
                        <li className='hover:font-bold hover:text-xl'>Mobile and desktop responsive UI</li>
                    </ul>
                </div>

                {/* Features */}
                <div className='mt-10 text-center'>
                    <h2 className='text-2xl font-bold mb-2'>⚙️ Key Features</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-lg text-gray-800'>
                        <div>✅ Clean & modern UI</div>
                        <div>✅ Seamless user experience</div>
                        <div>✅ Built with React, Node.js, Express & MongoDB</div>
                        <div>✅ Secure (JWT-based) authentication</div>
                    </div>
                </div>

            </div>
            <div className=' bottom-0 relative p-3 text-white bg-black flex  justify-between gap-2'>
                <div className='flex flex-wrap items-center justify-center gap-4'>
                    <div className='flex items-center justify-center gap-1'><FaGithubSquare/><button onClick={()=>{
                        window.open('https://github.com/VishnuGPT', '_blank')
                    }} className='cursor-pointer'>GitHub</button></div>
                    <div className='flex items-center justify-center gap-1'><FaLinkedinIn/><button onClick={()=> {window.open('https://www.linkedin.com/in/vishnu-gupta-bab866289/','_blank')}} className='cursor-pointer'>Linkedin</button></div>
                    <div className='flex items-center justify-center gap-1'><SiGmail /><h1>vishnugpt21@gmail.com</h1></div>
                </div>
                <h1>Made By Vishnu Gupta</h1>
            </div>
            {loading && <NormalLoading />}
        </>
    );
};

export default About;
