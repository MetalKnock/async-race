import React from 'react';
import { Path, URL } from '../../const/const';
import { ICar } from '../../types/data';
import CarIcon from '../SVG/CarIcon';
import styles from './Car.module.scss';

interface CarProps {
  data: ICar;
  selectedCar: ICar;
  getCarsOnCurrentPage: () => Promise<void>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
}

export default function Car({ data, selectedCar, getCarsOnCurrentPage, setSelectedCar }: CarProps) {
  const handleClickRemove = async () => {
    try {
      const response = await fetch(`${URL}${Path.garage}/${data.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      if (selectedCar.id === data.id) {
        setSelectedCar({ name: '', color: '#000000', id: 0 });
      }
      getCarsOnCurrentPage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickSelect = async () => {
    setSelectedCar(data);
  };

  return (
    <div className={styles.car}>
      <button className={styles.car__select} type="button" onClick={handleClickSelect}>
        Select
      </button>
      <button className={styles.car__remove} type="button" onClick={handleClickRemove}>
        Remove
      </button>
      <div className={styles.car__name}>{data.name}</div>
      <div>id: {data.id}</div>
      <CarIcon className={styles.car__icon} color={data.color} />
    </div>
  );
}
