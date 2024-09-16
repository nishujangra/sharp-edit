import { useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ImageContext } from '../context/ImageContext';
import Slider from '../components/Slider';

const ImagePage = () => {
    const location = useLocation();
    const {
        imageUrl,
        setImageUrl,
        brightness,
        setBrightness,
        saturation,
        setSaturation,
        rotation,
        setRotation,
        format,
        setFormat,
    } = useContext(ImageContext) ?? {};

    const initialImageUrl = location.state?.imageUrl;

    // Initialize the image URL from location state
    useEffect(() => {
        const img = 'http://localhost:5000/uploads/' + initialImageUrl;
        if (setImageUrl) {
            setImageUrl(img);
        }
    }, [initialImageUrl, setImageUrl]);

    // Function to update the image preview based on current settings
    const updateImagePreview = useCallback(async () => {
        if (!imageUrl) return;

        try {
            // Apply brightness
            console.log(imageUrl);
            let response = await axios.post(`http://localhost:5000/api/brightness`, {
                fileName: imageUrl.includes('/uploads/') ? imageUrl.split('/uploads/')[1] : imageUrl,
                brightness,
            },{
                responseType: 'arraybuffer'
            });
            const base64ImageString = Buffer.from(response.data, 'binary').toString('base64');
            const base64Image = `data:image/jpeg;base64,${base64ImageString}`;
            console.log(base64Image);
            console.log(response.data);
            if (setImageUrl) {
                setImageUrl(response.data);
            }

            // Apply saturation
            response = await axios.post(`http://localhost:5000/api/saturation`, {
                fileName: imageUrl.includes('/uploads/') ? imageUrl.split('/uploads/')[1] : imageUrl,
                saturation,
            },{
                responseType: 'arraybuffer'
            });
            const base64ImageString2 = Buffer.from(response.data, 'binary').toString('base64');
            const base64Image2 = `data:image/jpeg;base64,${base64ImageString2}`;
            console.log(base64Image2);
            if (setImageUrl) {
                setImageUrl(response.data);
            }

            // Apply rotation
            response = await axios.post(`http://localhost:5000/api/rotate`, {
                fileName: imageUrl.includes('/uploads/') ? imageUrl.split('/uploads/')[1] : imageUrl,
                rotation,
            },{
                responseType: 'arraybuffer'
            });
            const base64ImageString3 = Buffer.from(response.data, 'binary').toString('base64');
            const base64Image3 = `data:image/jpeg;base64,${base64ImageString3}`;
            console.log(base64Image3);
            if(setImageUrl) {
                setImageUrl(response.data);
            }
        } catch (error) {
            console.error('Error updating image:', error);
        }
    }, [imageUrl, brightness, saturation, rotation, setImageUrl]);

    // Effect to handle real-time image updates when values change
    useEffect(() => {
        updateImagePreview();
    }, [brightness, saturation, rotation, updateImagePreview]);

    // Image format conversion (JPEG/PNG)
    const handleFormatChange = async (newFormat: string) => {
        if(!imageUrl) return;
        try {
            const response = await axios.post(`http://localhost:5000/api/convert`, {
                fileName: imageUrl.includes('/uploads/') ? imageUrl.split('/uploads/')[1] : imageUrl,
                format: newFormat,
            });
            if (setImageUrl) {
                setImageUrl(response.data);
            }
            if (setFormat) {
                setFormat(newFormat);
            }
        } catch (error) {
            console.error('Error converting image:', error);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6">Sharp Edit - Image Editor</h1>

            {/* Image Preview */}
            {imageUrl && <img src={imageUrl} alt="Preview" className="w-full max-w-lg mb-6" />}

            {/* Sliders for Brightness, Saturation, and Rotation */}
            <Slider label="Brightness" value={brightness ?? 1} onChange={setBrightness ?? (() => { })} min={0.1} max={2} step={0.1} />
            <Slider label="Saturation" value={saturation ?? 1} onChange={setSaturation ?? (() => { })} min={0} max={2} step={0.1} />
            <Slider label="Rotation" value={rotation ?? 0} onChange={setRotation ?? (() => { })} min={0} max={360} step={1} />

            {/* Format Conversion */}
            <div className="mt-6">
                <label className="mr-2 font-semibold">Format:</label>
                <select value={format} onChange={(e) => handleFormatChange(e.target.value)} className="border rounded p-2">
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                </select>
            </div>
        </div>
    );
};

export default ImagePage;