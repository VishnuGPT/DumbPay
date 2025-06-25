import React from 'react'

const Big_Button = (props) => {
    return (
        <button onClick={props.onClick} className='bg-black text-white w-[80%] px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer transform active:scale-95'>{props.name}</button>

    )
}

export default Big_Button
