import React, { useState, useRef, useEffect } from 'react';
import { getCars, updateCar } from '../../../api/raceAPI';
import { DEFAULT_COLOR_INPUT, INIT_SELECTED_CAR } from '../../../const/const';
import { ICar, ICarCreate, ICars } from '../../../types/data';
import { IGetCars } from '../../../types/raceAPI';
import styles from './UpdateCar.module.scss';

interface UpdateCarProps {
  page: number;
  selectedCar: ICar;
  carsQuantity: number;
  setCarsQuantity: React.Dispatch<React.SetStateAction<number>>;
  setCars: React.Dispatch<React.SetStateAction<ICars>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
}

export default function UpdateCar({
  page,
  selectedCar,
  carsQuantity,
  setCarsQuantity,
  setCars,
  setSelectedCar,
}: UpdateCarProps) {
  const [inputName, setInputName] = useState('');
  const [inputColor, setInputColor] = useState(DEFAULT_COLOR_INPUT);

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
      const result: IGetCars = await getCars({ page });
      setCarsQuantity(result.quantity);
      if (result.cars) {
        setCars(result.cars);
      }
      setSelectedCar(INIT_SELECTED_CAR);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputName(e.target.value);
    }
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputColor(e.target.value);
    }
  };

  useEffect(() => {
    if (carsQuantity > 0) {
      setInputName(selectedCar.name);
      setInputColor(selectedCar.color);
    }
  }, [selectedCar]);

  return (
    <form className={styles.updateCar} onSubmit={handleSubmitUpdate}>
      <input
        type="text"
        ref={name}
        value={inputName}
        disabled={selectedCar === INIT_SELECTED_CAR}
        onChange={handleChangeName}
      />
      <input
        type="color"
        ref={color}
        value={inputColor}
        disabled={selectedCar === INIT_SELECTED_CAR}
        onChange={handleChangeColor}
      />
      <button type="submit" disabled={selectedCar === INIT_SELECTED_CAR}>
        UPDATE
      </button>
    </form>
  );
}
