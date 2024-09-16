import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImageUploadCard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setSelectedFile(file);
      setError(null); // Clear error if a valid image is selected
    } else {
      setError('Please upload a valid PNG or JPEG image.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('No image selected. Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = response.data.imageUrl.split('/')[1];
      navigate('/image', { state: { imageUrl } });
    } catch (error) {
      console.error('Failed to upload image:', error);
      setError('Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Upload Your Image</h2>

      {error && (
        <div className="bg-red-100 border border-red-500 text-red-600 font-bold rounded-lg p-4 mb-4">
          {error}
        </div>
      )}
      <div className='p-6'>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          className="mb-4 w-full text-gray-700 border-2 border-indigo-500 p-2 rounded-md focus:border-teal-500 focus:outline-none"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white py-2 px-4 rounded-full w-full hover:bg-blue-700 transition-all duration-300"
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ImageUploadCard;
