import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header';
import { GarageContextProvider } from '../../context/GarageContext';
import { WinnersContextProvider } from '../../context/WinnersContext';
import Garage from '../../Pages/Garage';
import Winners from '../../Pages/Winners';

export default function RootRouter() {
  return (
    <div>
      <GarageContextProvider>
        <WinnersContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Garage />} />
            <Route path="/winners" element={<Winners />} />
          </Routes>
        </WinnersContextProvider>
      </GarageContextProvider>
    </div>
  );
}
