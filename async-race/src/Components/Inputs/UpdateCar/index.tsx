import React, { useRef, useEffect } from 'react';
import { getCars, updateCar } from '../../../api/raceAPI';
import { INIT_SELECTED_CAR } from '../../../const/const';
import useGarageContext from '../../../hooks/useGarageContext';
import { ICarCreate } from '../../../types/data';
import styles from './UpdateCar.module.scss';

export default function UpdateCar() {
  const {
    pageGarage,
    carsQuantity,
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

  useEffect(() => {
    if (carsQuantity > 0) {
      setInputUpdateCarName(selectedCar.name);
      setInputUpdateCarColor(selectedCar.color);
    }
  }, [selectedCar]);

  return (
    <form className={styles.updateCar} onSubmit={handleSubmitUpdate}>
      <input
        type="text"
        ref={name}
        value={inputUpdateCarName}
        disabled={selectedCar === INIT_SELECTED_CAR}
        onChange={handleChangeName}
      />
      <input
        type="color"
        ref={color}
        value={inputUpdateCarColor}
        disabled={selectedCar === INIT_SELECTED_CAR}
        onChange={handleChangeColor}
      />
      <button type="submit" disabled={selectedCar === INIT_SELECTED_CAR}>
        UPDATE
      </button>
    </form>
  );
}
