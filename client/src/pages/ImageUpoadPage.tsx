import React from 'react';
import ImageUploadCard from '../components/ImageUploadCard';

const ImageUploadPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 flex flex-col items-center justify-center">
                <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Sharp Edit</h1>
                <ImageUploadCard />
            </div>
        </div>
    );
};

export default ImageUploadPage;