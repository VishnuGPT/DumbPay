import React from 'react'

const Balance = (props) => {
  return (
    <div className='flex items-center gap-4 m-2 flex-wrap'>
      <h1 className='text-2xl font-bold'>Your Balance:</h1>
      <h1 className='text-2xl'>${props.balance}</h1>
    </div>
    
  )
}

export default Balance
