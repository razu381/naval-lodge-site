import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage1 from './pages/homepage-1';
import Homepage2 from './pages/homepage-2';
import Homepage3 from './pages/homepage-3';
import Cabins from './Cabins';
import Inns from './Inns';
import Locations from './Locations';
import Offers from './Offers';
import About from './About';
import Signin from './Signin';
import Signup from './Signup';
import SearchResults from './SearchResults';
import NotFound from './NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage1 />} />
      <Route path="/homepage-1" element={<Homepage1 />} />
      <Route path="/homepage-2" element={<Homepage2 />} />
      <Route path="/homepage-3" element={<Homepage3 />} />
      <Route path="/cabins" element={<Cabins />} />
      <Route path="/inns" element={<Inns />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
