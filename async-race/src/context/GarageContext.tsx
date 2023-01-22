import React, { useState } from 'react';
import { DEFAULT_COLOR, INIT_SELECTED_CAR } from '../const/const';
import { IGarageContext } from '../types/context';
import { ICar, ICars, IFinishedCars, IRaceEngines } from '../types/data';

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
  const [inputUpdateCarColor, setInputUpdateCarColor] = useState(DEFAULT_COLOR);
  const [inputCreateCarName, setInputCreateCarName] = useState('');
  const [inputCreateCarColor, setInputCreateCarColor] = useState(DEFAULT_COLOR);
  const [finishedCars, setFinishedCars] = useState<IFinishedCars[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [abortContollers, setAbortControllers] = useState<AbortController[]>([]);

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
      finishedCars,
      isOpenModal,
      abortContollers,
      setPageGarage,
      setCars,
      setCarsQuantity,
      setSelectedCar,
      setRaceEngines,
      setInputUpdateCarName,
      setInputUpdateCarColor,
      setInputCreateCarName,
      setInputCreateCarColor,
      setFinishedCars,
      setIsOpenModal,
      setAbortControllers,
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
      finishedCars,
      isOpenModal,
      abortContollers,
    ],
  );
  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}
