import React, { createContext, useState, ReactNode } from 'react';

interface ImageContextType {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  rotation: number;
  setRotation: (value: number) => void;
  format: string;
  setFormat: (format: string) => void;
}

export const ImageContext = createContext<ImageContextType | null>(null);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [brightness, setBrightness] = useState<number>(1); // Default 1 (no change)
  const [saturation, setSaturation] = useState<number>(1); // Default 1 (no change)
  const [rotation, setRotation] = useState<number>(0); // Default 0 (no rotation)
  const [format, setFormat] = useState<string>('jpeg'); // Default to jpeg

  return (
    <ImageContext.Provider
      value={{
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
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};