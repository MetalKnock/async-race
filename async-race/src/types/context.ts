import React from 'react';
import { ICar, ICars, IFinishedCars, IQuerySort, IRaceEngines, IWinners } from './data';

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
  finishedCars: IFinishedCars[];
  isOpenModal: boolean;
  abortContollers: AbortController[];
  setPageGarage: React.Dispatch<React.SetStateAction<number>>;
  setCars: React.Dispatch<React.SetStateAction<ICars>>;
  setCarsQuantity: React.Dispatch<React.SetStateAction<number>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
  setRaceEngines: React.Dispatch<React.SetStateAction<IRaceEngines>>;
  setInputUpdateCarName: React.Dispatch<React.SetStateAction<string>>;
  setInputUpdateCarColor: React.Dispatch<React.SetStateAction<string>>;
  setInputCreateCarName: React.Dispatch<React.SetStateAction<string>>;
  setInputCreateCarColor: React.Dispatch<React.SetStateAction<string>>;
  setFinishedCars: React.Dispatch<React.SetStateAction<IFinishedCars[]>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAbortControllers: React.Dispatch<React.SetStateAction<AbortController[]>>;
}

export interface IWinnersContext {
  pageWinners: number;
  winners: IWinners;
  winnersQuantity: number;
  querySort: IQuerySort;
  setPageWinners: React.Dispatch<React.SetStateAction<number>>;
  setWinners: React.Dispatch<React.SetStateAction<IWinners>>;
  setWinnersQuantity: React.Dispatch<React.SetStateAction<number>>;
  setQuerySort: React.Dispatch<React.SetStateAction<IQuerySort>>;
}
