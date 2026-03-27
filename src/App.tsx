import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage1 from './pages/homepage-1';
import Homepage2 from './pages/homepage-2';
import NotFound from './NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage1 />} />
      <Route path="/homepage-1" element={<Homepage1 />} />
      <Route path="/homepage-2" element={<Homepage2 />} />
      <Route path="*" element={<NotFound />} />
      {/* Add more routes for other pages */}
      {/* <Route path="/locations" element={<Locations />} /> */}
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}
