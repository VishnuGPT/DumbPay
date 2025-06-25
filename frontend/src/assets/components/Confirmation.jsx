import React from 'react'

const Confirmation = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="bg-white shadow-2xl rounded-2xl p-6 px-10 text-center border border-green-300">
                <h1 className="text-3xl font-bold text-green-600 animate-pulse mb-2">Transfer Successful</h1>
                <p className="text-gray-700 text-lg">The amount has been sent successfully.</p>
            </div>
        </div>
    )
}

export default Confirmation
