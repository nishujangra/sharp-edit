import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange, min, max, step }) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <label className="font-semibold mb-2">{label}: {value}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full max-w-lg"
      />
    </div>
  );
};

export default Slider;
