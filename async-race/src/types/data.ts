import { QUERY_SORT, QUERY_ORDER } from '../const/const';

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
export interface IRaceEngine {
  id: number;
  engine: IEngine;
}

export type IRaceEngines = IRaceEngine[];

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type IWinners = IWinner[];

export interface IWinnerUpdate {
  wins: number;
  time: number;
}

export interface IQuerySort {
  sort: QUERY_SORT;
  order: QUERY_ORDER;
}
