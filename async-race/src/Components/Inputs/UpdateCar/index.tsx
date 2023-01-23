import React, { useRef } from 'react';
import { getCars, updateCar } from '../../../api/raceAPI';
import { DEFAULT_COLOR, INIT_SELECTED_CAR } from '../../../const/const';
import useGarageContext from '../../../hooks/useGarageContext';
import { ICarCreate } from '../../../types/data';
import styles from './UpdateCar.module.scss';

export default function UpdateCar() {
  const {
    isAnimatedCars,
    isStartedRace,
    pageGarage,
    selectedCar,
    inputUpdateCarName,
    inputUpdateCarColor,
    setCarsQuantity,
    setCars,
    setSelectedCar,
    setInputUpdateCarName,
    setInputUpdateCarColor,
  } = useGarageContext();

  const name = useRef<HTMLInputElement | null>(null);
  const color = useRef<HTMLInputElement | null>(null);

  const handleSubmitUpdate = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.current && color.current) {
      const data: ICarCreate = {
        name: name.current.value,
        color: color.current.value,
      };
      await updateCar({ data, idSelectedCar: selectedCar.id });
      const carsData = await getCars({ pageGarage });
      if (!carsData) {
        throw Error('getCars is null');
      }
      setCarsQuantity(carsData.quantity);
      if (carsData.cars) {
        setCars(carsData.cars);
      }
      setSelectedCar(INIT_SELECTED_CAR);
      setInputUpdateCarName('');
      setInputUpdateCarColor(DEFAULT_COLOR);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputUpdateCarName(e.target.value);
    }
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputUpdateCarColor(e.target.value);
    }
  };

  return (
    <form className={styles.updateCar} onSubmit={handleSubmitUpdate}>
      <input
        type="text"
        ref={name}
        value={inputUpdateCarName}
        disabled={selectedCar === INIT_SELECTED_CAR || isStartedRace || isAnimatedCars.length !== 0}
        onChange={handleChangeName}
      />
      <input
        type="color"
        ref={color}
        value={inputUpdateCarColor}
        disabled={selectedCar === INIT_SELECTED_CAR || isStartedRace || isAnimatedCars.length !== 0}
        onChange={handleChangeColor}
      />
      <button
        type="submit"
        disabled={selectedCar === INIT_SELECTED_CAR || isStartedRace || isAnimatedCars.length !== 0}
      >
        UPDATE
      </button>
    </form>
  );
}
