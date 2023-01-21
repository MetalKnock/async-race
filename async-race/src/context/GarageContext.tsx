import React, { useState } from 'react';
import { DEFAULT_COLOR_INPUT, INIT_SELECTED_CAR } from '../const/const';
import { IGarageContext } from '../types/context';
import { ICar, ICars, IRaceEngines } from '../types/data';

export const GarageContext = React.createContext<IGarageContext | null>(null);

interface GarageContextProviderProps {
  children: React.ReactNode;
}

export function GarageContextProvider({ children }: GarageContextProviderProps) {
  const [pageGarage, setPageGarage] = useState(1);
  const [cars, setCars] = useState<ICars>([]);
  const [carsQuantity, setCarsQuantity] = useState(0);
  const [selectedCar, setSelectedCar] = useState<ICar>(INIT_SELECTED_CAR);
  const [raceEngines, setRaceEngines] = useState<IRaceEngines>([]);
  const [inputUpdateCarName, setInputUpdateCarName] = useState('');
  const [inputUpdateCarColor, setInputUpdateCarColor] = useState(DEFAULT_COLOR_INPUT);
  const [inputCreateCarName, setInputCreateCarName] = useState('');
  const [inputCreateCarColor, setInputCreateCarColor] = useState(DEFAULT_COLOR_INPUT);

  const value = React.useMemo(
    () => ({
      pageGarage,
      cars,
      carsQuantity,
      selectedCar,
      raceEngines,
      inputUpdateCarName,
      inputUpdateCarColor,
      inputCreateCarName,
      inputCreateCarColor,
      setPageGarage,
      setCars,
      setCarsQuantity,
      setSelectedCar,
      setRaceEngines,
      setInputUpdateCarName,
      setInputUpdateCarColor,
      setInputCreateCarName,
      setInputCreateCarColor,
    }),
    [
      pageGarage,
      cars,
      carsQuantity,
      selectedCar,
      raceEngines,
      inputUpdateCarName,
      inputUpdateCarColor,
      inputCreateCarName,
      inputCreateCarColor,
    ],
  );
  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}
