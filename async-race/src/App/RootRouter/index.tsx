import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../../Pages/Main';

export default function RootRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}
