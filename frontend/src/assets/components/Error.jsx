import React from 'react'

const Error = (props) => {
  return (
    <div className='absolute flex justify-center inset-0 items-center z-51 backdrop-blur-xl bg-white/60'>
      <h1 className='text-2xl text-red-500 font-bold'>{props.error}</h1>
    </div>
  )
}

export default Error
