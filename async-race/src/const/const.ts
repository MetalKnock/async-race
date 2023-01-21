import { ICar, IRaceEngine } from '../types/data';

export const BASE = 'http://127.0.0.1:3000';

export enum PATH {
  garage = '/garage',
  winners = '/winners',
  engine = '/engine',
}

export enum TYPE_PAGINATION {
  garage = 'garage',
  winners = 'winners',
}

export const CARS_PER_PAGE = 7;

export const WINNERS_PER_PAGE = 10;

export const DEFAULT_COLOR = '#000000';

export const INIT_SELECTED_CAR: ICar = {
  name: '',
  color: DEFAULT_COLOR,
  id: 0,
};

export const INIT_RACE_ENGINE: IRaceEngine = {
  id: 0,
  engine: { velocity: 0, distance: 0 },
};

export const WIDTH_CAR_ICON = 100;
