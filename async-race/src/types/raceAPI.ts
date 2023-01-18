import { ICarCreate, ICars } from './data';

export interface getCarsProps {
  page: number;
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

export interface IGetCars {
  cars: ICars | null;
  quantity: number;
}

export interface IDriveMode {
  success: boolean;
}
