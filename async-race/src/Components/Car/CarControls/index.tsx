import React from 'react';
import { deleteCar, getCars } from '../../../api/raceAPI';
import { INIT_SELECTED_CAR } from '../../../const/const';
import useGarageContext from '../../../hooks/useGarageContext';
import { ICar } from '../../../types/data';
import { IGetCars } from '../../../types/raceAPI';
import styles from './CarControls.module.scss';

interface CarControlsProps {
  data: ICar;
}

export default function CarControls({ data }: CarControlsProps) {
  const { selectedCar, pageGarage, setSelectedCar, setCarsQuantity, setCars } = useGarageContext();

  const handleClickRemove = async () => {
    await deleteCar({ id: data.id });
    if (selectedCar.id === data.id) {
      setSelectedCar(INIT_SELECTED_CAR);
    }
    const result: IGetCars = await getCars({ pageGarage });
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
      <button
        type="button"
        className={styles.carControls__select}
        disabled={selectedCar.id === data.id}
        onClick={handleClickSelect}
      >
        SELECT
      </button>
      <button
        type="button"
        className={styles.carControls__remove}
        disabled={false}
        onClick={handleClickRemove}
      >
        REMOVE
      </button>
    </div>
  );
}
