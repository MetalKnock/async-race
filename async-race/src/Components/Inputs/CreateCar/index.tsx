import React, { useRef } from 'react';
import { createCar, getCars } from '../../../api/raceAPI';
import { ICarCreate, ICars } from '../../../types/data';
import { IGetCars } from '../../../types/raceAPI';
import styles from './CreateCar.module.scss';

interface CreateCarProps {
  page: number;
  setCarsQuantity: React.Dispatch<React.SetStateAction<number>>;
  setCars: React.Dispatch<React.SetStateAction<ICars>>;
}

export default function CreateCar({ page, setCarsQuantity, setCars }: CreateCarProps) {
  const name = useRef<HTMLInputElement | null>(null);
  const color = useRef<HTMLInputElement | null>(null);

  const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.current && color.current) {
      const data: ICarCreate = {
        name: name.current.value,
        color: color.current.value,
      };
      await createCar({ data });
      const result: IGetCars = await getCars({ page });
      setCarsQuantity(result.quantity);
      if (result.cars) {
        setCars(result.cars);
      }
    }
  };

  return (
    <form className={styles.createCar} onSubmit={handleSubmitCreate}>
      <input type="text" ref={name} />
      <input type="color" ref={color} />
      <button type="submit">CREATE</button>
    </form>
  );
}
