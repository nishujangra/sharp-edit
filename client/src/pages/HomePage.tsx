import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/upload');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white">
            <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Sharp Edit</h1>
            <p className="text-xl mb-8">Upload, edit, and enhance your images with ease!</p>
            <button
                onClick={handleStart}
                className="bg-white text-indigo-500 hover:text-white hover:bg-indigo-700 font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300 ease-in-out"
            >
                Get Started
            </button>
        </div>
    );
};

export default HomePage;