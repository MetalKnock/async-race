import { ICarCreate, ICars, IWinner, IWinners, IWinnerUpdate } from './data';

export interface getCarsProps {
  pageGarage: number;
}

export interface createCarProps {
  data: ICarCreate;
}

export interface updateCarProps {
  data: ICarCreate;
  idSelectedCar: number;
}

export interface deleteCarProps {
  id: number;
}

export interface controlCarEngineProps {
  id: number;
  status: 'started' | 'stopped';
}

export interface driveModeProps {
  id: number;
}

export interface getWinnersProps {
  page: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
}

export interface createWinnerProps {
  data: IWinner;
}

export interface deleteWinnerProps {
  id: number;
}

export interface updateWinnerProps {
  data: IWinnerUpdate;
  id: number;
}

export interface IGetWinners {
  winners: IWinners | null;
  quantity: number;
}

export interface IGetCars {
  cars: ICars | null;
  quantity: number;
}

export interface IDriveMode {
  success: boolean;
}
