import { ICar } from '../types/data';

export const BASE = 'http://127.0.0.1:3000';

export enum PATH {
  garage = '/garage',
  winners = '/winners',
  engine = '/engine',
}

export const CARS_PER_PAGE = 7;

export const DEFAULT_COLOR_INPUT = '#000000';

export const INIT_SELECTED_CAR: ICar = {
  name: '',
  color: DEFAULT_COLOR_INPUT,
  id: 0,
};

export const WIDTH_CAR_ICON = 100;
