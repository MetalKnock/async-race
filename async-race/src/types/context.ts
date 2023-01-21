import React from 'react';
import { ICar, ICars, IRaceEngines } from './data';

export interface IGarageContext {
  pageGarage: number;
  cars: ICars;
  carsQuantity: number;
  selectedCar: ICar;
  raceEngines: IRaceEngines;
  inputUpdateCarName: string;
  inputUpdateCarColor: string;
  inputCreateCarName: string;
  inputCreateCarColor: string;
  setPageGarage: React.Dispatch<React.SetStateAction<number>>;
  setCars: React.Dispatch<React.SetStateAction<ICars>>;
  setCarsQuantity: React.Dispatch<React.SetStateAction<number>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
  setRaceEngines: React.Dispatch<React.SetStateAction<IRaceEngines>>;
  setInputUpdateCarName: React.Dispatch<React.SetStateAction<string>>;
  setInputUpdateCarColor: React.Dispatch<React.SetStateAction<string>>;
  setInputCreateCarName: React.Dispatch<React.SetStateAction<string>>;
  setInputCreateCarColor: React.Dispatch<React.SetStateAction<string>>;
}

export interface IWinnersContext {
  pageWinners: number;
  setPageWinners: React.Dispatch<React.SetStateAction<number>>;
}
