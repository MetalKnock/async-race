import { ICar, ICarCreate, ICars, IWinner, IWinnerUpdate } from './data';

export interface getCarsProps {
  pageGarage: number;
}

export interface getCarProps {
  id: number;
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
  signal?: AbortSignal;
}

export interface getWinnersProps {
  page?: number;
  limit?: number;
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
}

export interface getWinnerProps {
  id: number;
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

export interface IGetWinner {
  winner: IWinner | null;
}

export interface IGetCars {
  cars: ICars | null;
  quantity: number;
}

export interface IGetCar {
  car: ICar | null;
}
export interface IDriveMode {
  success: boolean;
}
