import { ICarCreate, ICarsCreate } from '../types/data';
import data from '../data/data.json';

export const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);

export const getRandomHexColor = (size: number): string =>
  `#${Array.from({ length: size }, () => getRandomNumber(16).toString(16)).join('')}`;

export const getRandomName = (): string =>
  `${data.make[getRandomNumber(10)]} ${data.model[getRandomNumber(10)]}`;

export const getRandomData = (): ICarCreate => ({
  name: getRandomName(),
  color: getRandomHexColor(6),
});

export const getRandomNData = (n: number): ICarsCreate =>
  [...Array<ICarCreate>(n)].map(() => getRandomData());
