import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import NormalLoading from './NormalLoading'
import { FaGithubSquare, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import FlippingTrapezium from './FlippingTrapezium'

const About = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    return (
        <>

            <div className='p-6 bg-black'>
                {/* Header */}
                <div className='flex justify-between items-center mb-6 gap-2'>
                    <h1 className='text-4xl font-extrabold text-white'>DumbPay WebApp</h1>
                    <div className='flex justify-center items-center flex-wrap gap-4'>
                        <button
                            onClick={() => {
                                setloading(true)
                                setTimeout(() => {
                                    setloading(false)
                                    navigate('/signin')
                                }, 1000)
                            }}
                            className=' cursor-pointer bg-white text-black px-6 py-2 rounded-2xl font-semibold transform active:scale-90 hover:scale-105 transition duration-200'
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

                            className='cursor-pointer bg-white text-black px-6 py-2 rounded-2xl font-semibold transform active:scale-90 hover:scale-105 transition duration-200'
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
                    <FlippingTrapezium />
                </div>



            </div>
            <div className="w-full p-2 bg-white text-black flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base">
                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-black">
                    <div className="flex items-center gap-1">
                        <FaGithubSquare className="text-xl" />
                        <button
                            onClick={() => window.open('https://github.com/VishnuGPT', '_blank')}
                            className="hover:underline cursor-pointer"
                        >
                            GitHub
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <FaLinkedinIn className="text-xl" />
                        <button
                            onClick={() => window.open('https://www.linkedin.com/in/vishnu-gupta-bab866289/', '_blank')}
                            className="hover:underline cursor-pointer"
                        >
                            LinkedIn
                        </button>
                    </div>

                    <div className="flex items-center gap-1">
                        <SiGmail className="text-xl" />
                        <span className="break-all">vishnugpt21@gmail.com</span>
                    </div>
                </div>

                {/* Credit */}
                <h1 className="text-center sm:text-right whitespace-nowrap">Made by Vishnu Gupta</h1>
            </div>

            {loading && <NormalLoading />}
        </>
    );
};

export default About;
