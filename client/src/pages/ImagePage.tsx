// src/pages/ImagePage.tsx
import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import { useLocation } from 'react-router-dom';
import { manipulateImage } from '../services/imageService';

const ImagePage: React.FC = () => {
    const location = useLocation();
    const [brightness, setBrightness] = useState(1);
    const [saturation, setSaturation] = useState(1);
    const [rotation, setRotation] = useState(0);

    const imageUrl = location.state?.imageUrl || '';

    if (!imageUrl) {
        return <p>No image available</p>;
    }

    const handleManipulate = async () => {
        try {

            const response = await manipulateImage(imageUrl, {
                brightness,
                saturation,
                rotation
            });

            return response;
        } catch (error) {
            console.error('Error manipulating image:', error);
        }
    };

    const [previewImage, setPreviewImage] = useState<Blob | undefined>(undefined);

    useEffect(() => {
        const fetchPreviewImage = async () => {
            const image = await handleManipulate();
            setPreviewImage(image);
        };

        fetchPreviewImage();
        {
            previewImage ? (
                <img
                    src={URL.createObjectURL(previewImage)}
                    alt="Uploaded Preview"
                    className="w-full max-h-[50vh] max-w-lg rounded shadow-lg"
                />
            ) : (
                <p className="text-gray-600">No image uploaded yet.</p>
            )
        } otation, imageUrl]);

    return (
        <div className="mx-auto p-6">
            <h2 className="text-4xl text-center font-semibold mb-8">Image Manipulation</h2>

            {/* Image Preview */}
            <div className="flex justify-center mb-6">
                {previewImage ? (
                    <img
                        src={`http://localhost:5000/uploads/${imageUrl}`}
                        alt="Uploaded Preview"
                        className="w-full max-h-[50vh] max-w-lg rounded shadow-lg"
                    />
                ) : (
                    <p className="text-gray-600">No image uploaded yet.</p>
                )}
            </div>

            {/* Sliders for Manipulation */}
            <div className="w-full max-w-lg mx-auto">
                <Slider
                    label="Brightness"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={brightness}
                    onChange={setBrightness}
                />
                <Slider
                    label="Saturation"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={saturation}
                    onChange={setSaturation}
                />
                <Slider
                    label="Rotation"
                    min={-180}
                    max={180}
                    step={1}
                    value={rotation}
                    onChange={setRotation}
                />
            </div>
        </div>
    );
};

export default ImagePage;