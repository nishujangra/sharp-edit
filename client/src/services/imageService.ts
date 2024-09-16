export const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', image);
  
    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to upload the image');
    }
  
    return data.imageUrl;
  };
  