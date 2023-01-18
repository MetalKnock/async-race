export interface ICarCreate {
  name: string;
  color: string;
}

export type ICarsCreate = ICarCreate[];

export interface ICar extends ICarCreate {
  id: number;
}

export type ICars = ICar[];

export interface IEngine {
  velocity: number;
  distance: number;
}
