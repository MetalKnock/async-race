import React from 'react';
import { deleteCar, getCars } from '../../../api/raceAPI';
import { INIT_SELECTED_CAR } from '../../../const/const';
import { ICar, ICars } from '../../../types/data';
import { IGetCars } from '../../../types/raceAPI';
import Button from '../../Button';
import styles from './CarControls.module.scss';

interface CarControlsProps {
  data: ICar;
  selectedCar: ICar;
  page: number;
  setCarsQuantity: (value: React.SetStateAction<number>) => void;
  setCars: (value: React.SetStateAction<ICars>) => void;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
}

export default function CarControls({
  data,
  selectedCar,
  page,
  setCarsQuantity,
  setCars,
  setSelectedCar,
}: CarControlsProps) {
  const handleClickRemove = async () => {
    await deleteCar({ id: data.id });
    if (selectedCar.id === data.id) {
      setSelectedCar(INIT_SELECTED_CAR);
    }
    const result: IGetCars = await getCars({ page });
    setCarsQuantity(result.quantity);
    if (result.cars) {
      setCars(result.cars);
    }
  };

  const handleClickSelect = () => {
    setSelectedCar(data);
  };

  return (
    <div className={styles.carControls}>
      <Button
        className={styles.carControls__select}
        title="SELECT"
        disabled={selectedCar.id === data.id}
        handleClick={handleClickSelect}
      />
      <Button
        className={styles.carControls__remove}
        title="REMOVE"
        disabled={false}
        handleClick={handleClickRemove}
      />
    </div>
  );
}
