import React from 'react'

const Heading = (props) => {
    return (
        <div>
            <h1 className='text-2xl font-bold text-center'>{props.heading}</h1>
            <h2 className='text-base font-light text-center'>{props.subheading}</h2>
        </div>
    )
}

export default Heading
