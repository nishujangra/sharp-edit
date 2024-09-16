import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ImageUpoadPage from './pages/ImageUpoadPage';
// import ImagePage from './pages/ImagePage';
import ImgPage from './pages/ImgPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<ImageUpoadPage />} />
        <Route path="/image" element={<ImgPage />} />
      </Routes>
    </Router>
  );
};

export default App;