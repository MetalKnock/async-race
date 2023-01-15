import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header';
import Garage from '../../Pages/Garage';
import Winners from '../../Pages/Winners';

export default function RootRouter() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
      </Routes>
    </div>
  );
}
