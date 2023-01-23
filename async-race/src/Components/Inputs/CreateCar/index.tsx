import React, { useRef } from 'react';
import { createCar, getCars } from '../../../api/raceAPI';
import useGarageContext from '../../../hooks/useGarageContext';
import { ICarCreate } from '../../../types/data';
import { DEFAULT_COLOR } from '../../../const/const';
import styles from './CreateCar.module.scss';

export default function CreateCar() {
  const {
    isAnimatedCars,
    pageGarage,
    inputCreateCarName,
    inputCreateCarColor,
    isStartedRace,
    setCars,
    setCarsQuantity,
    setInputCreateCarName,
    setInputCreateCarColor,
  } = useGarageContext();

  const name = useRef<HTMLInputElement | null>(null);
  const color = useRef<HTMLInputElement | null>(null);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target) {
      setInputCreateCarName(e.target.value);
    }
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target) {
      setInputCreateCarColor(e.target.value);
    }
  };

  const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (name.current && color.current) {
      const data: ICarCreate = {
        name: name.current.value,
        color: color.current.value,
      };
      await createCar({ data });
      const carsData = await getCars({ pageGarage });
      if (!carsData) {
        throw Error('getCars is null');
      }
      setCarsQuantity(carsData.quantity);
      if (carsData.cars) {
        setCars(carsData.cars);
      }
      setInputCreateCarName('');
      setInputCreateCarColor(DEFAULT_COLOR);
    }
  };

  return (
    <form className={styles.createCar} onSubmit={handleSubmitCreate}>
      <input
        className={styles.createCar__input}
        type="text"
        ref={name}
        value={inputCreateCarName}
        onChange={handleChangeName}
        disabled={isStartedRace || isAnimatedCars.length !== 0}
      />
      <input
        className={`${styles.createCar__input} ${styles.createCar__inputColor}`}
        type="color"
        ref={color}
        value={inputCreateCarColor}
        onChange={handleChangeColor}
        disabled={isStartedRace || isAnimatedCars.length !== 0}
      />
      <button
        className="button"
        type="submit"
        disabled={isStartedRace || isAnimatedCars.length !== 0}
      >
        CREATE
      </button>
    </form>
  );
}
