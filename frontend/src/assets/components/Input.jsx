import React from 'react'

const Input = (props) => {
    return (
        <div className='py-4 px-3 mx-auto w-[90%]'>
            <h1 className='text-base font-semibold'>{props.heading}</h1>
            <input name={props.name} onChange={props.onChange} value={props.value} type="text" placeholder={props.placeholder} className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
    )
}

export default Input
