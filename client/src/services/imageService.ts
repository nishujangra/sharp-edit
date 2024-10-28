import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

interface ImageOptions {
  brightness: number;
  saturation: number;
  rotation: number;
}

export const manipulateImage = async (image: File, options: ImageOptions) => {
  const formData = new FormData();
  formData.append('imageBuffer', image.name);
  formData.append('brightness', options.brightness.toString());
  formData.append('saturation', options.saturation.toString());
  formData.append('rotation', options.rotation.toString());

  try {
    const response = await axios.post(`${API_BASE_URL}/manipulate`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });

    return new Blob([response.data], { type: 'image/png' });
  } catch (error) {
    console.error('Error manipulating image:', error);
    throw error;
  }
};