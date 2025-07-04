import React from 'react';
import AnimatedCheck from './AnimatedCheck';
import AnimatedMagnifier from './AnimatedMagnifier';
import AnimatedSend from './AnimatedSend';
import AnimatedGraph from './AnimatedGraph';
import AnimatedPage from './AnimatedPage';
import AnimatedDevice from './AnimatedDevice';
import AnimatedLock from './AnimatedLock';
import AnimatedLayout from './AnimatedLayout';
import AnimatedStack from './AnimatedStack';

const features = [
    {
        title: 'Simple and fast account creation',
        Icon: () => <AnimatedCheck />,
    },
    {
        title: 'Smart user search by name',
        Icon: () => <AnimatedMagnifier />,
    },
    {
        title: 'Instant money transfers',
        Icon: () => <AnimatedSend />,
    },
    {
        title: 'Track your transaction history',
        Icon: () => <AnimatedGraph />,
    },
    {
        title: 'Single Page Application',
        Icon: () => <AnimatedPage />,
    },
    {
        title: 'Mobile & desktop responsive UI',
        Icon: () => <AnimatedDevice />,
    },
    {
        title: 'Secure (JWT-based) authentication',
        Icon: () => <AnimatedLock />,
    },
    {
        title: 'Clean & modern UI',
        Icon: () => <AnimatedLayout />,
    },
    {
        title: 'Built with React, Node.js, Express & MongoDB',
        Icon: () => <AnimatedStack />,
    },

];

export default function FlippingTrapezium() {
    return (
        <div className="bg-[#0f0f0f] py-10 px-4">
            <h2 className="text-white text-3xl font-bold text-center mb-8">⚙️ Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center text-white hover:shadow-2xl transition"
                    >
                        <feature.Icon />
                        <p className="mt-4 text-center text-lg">{feature.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
