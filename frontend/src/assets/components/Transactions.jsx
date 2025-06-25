import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../../../config';
import NormalLoading from './NormalLoading'
import { useNavigate } from 'react-router-dom';
export default function TransactionHistory() {
    const [reload, setReload] = useState(1);
    const Navigate = useNavigate()
    const [transactions, setTransactions] = useState([]);
    const [loading, setloading] = useState(false)
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${url}/api/v1/account/history`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setTransactions(res.data.data || []);
            console.log(transactions)
        }
        fetchData();
    }, [reload]);


    return (
        <>
            <div className="p-4 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-center">Transaction History</h2>
                <div className="space-y-4">
                    {transactions.length === 0 ? (
                        <p className="text-center text-gray-500">No transactions found.</p>
                    ) : (
                        transactions.map((tx) => (
                            <div key={tx.invoiceid}>
                                <div
                                    
                                    className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                                >
                                    <div>
                                        <p className="text-sm text-gray-500">{tx.date} at {tx.time}</p>
                                        <p className="text-base font-medium">
                                            {tx.which === 'sended' ? 'Sent to' : 'Received from'}{' '}
                                            <span className="font-semibold">{tx.which=='sended'?tx.to : tx.from}</span>
                                        </p>
                                        <p className="text-sm text-gray-600">{tx.message}</p>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`text-lg font-bold ${tx.status === 'success' ? 'text-green-600' : 'text-red-600'
                                                }`}
                                        >
                                            {tx.which === 'sended' ? '-' : '+'}${tx.amount}
                                        </p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${tx.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center'><button onClick={async () => {

                                    await axios.post(`${url}/api/v1/account/delete`, { "id": tx.invoiceid }, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                                        }
                                    })
                                    setReload(reload+1)
                                }} className="cursor-pointer transform active:scale-95  px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-bold transition">Delete</button></div>

                            </div>
                        ))
                    )}
                </div>
                <div className='flex justify-center items-center'><button onClick={() => {
                    setloading(true)
                    setTimeout(() => {
                        setloading(false)
                        Navigate('/Dashboard')
                    }, 2000)
                }} className=' cursor-pointer text-white bg-black w-[35vw] px-6 py-2 rounded-2xl transform active:scale-75 duration-200 transition m-4' >Go Back</button></div>
            </div>
            {loading && <NormalLoading />}
        </>
    );
}
