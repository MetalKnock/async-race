import { ICarCreate, ICarsCreate } from '../types/data';
import { make, model } from '../mock-data/data';

export const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);

export const getRandomHexColor = (size: number): string =>
  `#${Array.from({ length: size }, () => getRandomNumber(16).toString(16)).join('')}`;

export const getRandomName = (): string =>
  `${make[getRandomNumber(10)]} ${model[getRandomNumber(10)]}`;

export const getRandomData = (): ICarCreate => ({
  name: getRandomName(),
  color: getRandomHexColor(6),
});

export const getRandomNData = (n: number): ICarsCreate =>
  [...Array<ICarCreate>(n)].map(() => getRandomData());

export const easeInOutSine = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;

export const convertMillisecondsToSeconds = (num: number, numbersAfterPoint: number): number =>
  Number((num / 1000).toFixed(numbersAfterPoint));
