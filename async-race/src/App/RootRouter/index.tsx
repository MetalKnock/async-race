import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header';
import { PATH_ROUTER } from '../../const/const';
import { GarageContextProvider } from '../../context/GarageContext';
import { WinnersContextProvider } from '../../context/WinnersContext';
import Garage from '../../Pages/Garage';
import Winners from '../../Pages/Winners';

export default function RootRouter() {
  return (
    <div className="wrapper">
      <GarageContextProvider>
        <WinnersContextProvider>
          <Header />
          <Routes>
            <Route path={PATH_ROUTER.garage} element={<Garage />} />
            <Route path={PATH_ROUTER.winners} element={<Winners />} />
          </Routes>
        </WinnersContextProvider>
      </GarageContextProvider>
    </div>
  );
}
