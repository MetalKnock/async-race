import React, { useState } from 'react';
import { PATH, BASE, INIT_SELECTED_CAR } from '../../const/const';
import { ICar, ICars, IEngine, IGetCars } from '../../types/data';
import Button from '../Button';
import CarIcon from '../SVG/CarIcon';
import styles from './Car.module.scss';

interface CarProps {
  data: ICar;
  selectedCar: ICar;
  page: number;
  setCarsQuantity: (value: React.SetStateAction<number>) => void;
  setCars: (value: React.SetStateAction<ICars>) => void;
  getCarsOnCurrentPage: (page: number) => Promise<IGetCars>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
}

export default function Car({
  data,
  selectedCar,
  page,
  setCarsQuantity,
  setCars,
  getCarsOnCurrentPage,
  setSelectedCar,
}: CarProps) {
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0);

  const deleteCar = async () => {
    await fetch(`${BASE}${PATH.garage}/${data.id}`, {
      method: 'DELETE',
    });
  };

  const startCar = async () => {
    const response = await fetch(`${BASE}${PATH.engine}?id=${data.id}&status=started`, {
      method: 'PATCH',
    });
    const result: IEngine = await response.json();
    setVelocity(result.velocity);
    setDistance(result.distance);
  };

  const stopCar = async () => {
    const response = await fetch(`${BASE}${PATH.engine}?id=${data.id}&status=stopped`, {
      method: 'PATCH',
    });

    const result: IEngine = await response.json();
    setVelocity(result.velocity);
    setDistance(result.distance);
  };

  const switchDriveMode = async () => {
    const response = await fetch(`${BASE}${PATH.engine}?id=${data.id}&status=drive`, {
      method: 'PATCH',
    });

    const result: IEngine = await response.json();
    console.log(result);
  };

  const handleClickRemove = async () => {
    await deleteCar();
    if (selectedCar.id === data.id) {
      setSelectedCar(INIT_SELECTED_CAR);
    }
    const result: IGetCars = await getCarsOnCurrentPage(page);
    setCarsQuantity(result.quantity);
    if (result.result) {
      setCars(result.result);
    }
  };

  const handleClickSelect = () => {
    setSelectedCar(data);
  };

  const handleClickStart = async () => {
    await startCar();
    await switchDriveMode();
  };

  const handleClickStop = async () => {
    await stopCar();
  };

  return (
    <div className={styles.car}>
      <div className={styles.car__inner}>
        <Button
          className={styles.car__select}
          title="Select"
          disabled={selectedCar.id === data.id}
          handleClick={handleClickSelect}
        />
        <Button
          className={styles.car__remove}
          title="Remove"
          disabled={false}
          handleClick={handleClickRemove}
        />
        <div className={styles.car__name}>{data.name}</div>
        {/* <div>id: {data.id}</div> */}
      </div>
      <div className={`${styles.car__track} ${styles.car__inner}`}>
        <Button
          className={styles.car__start}
          title="A"
          disabled={false}
          handleClick={handleClickStart}
        />
        <Button
          className={styles.car__stop}
          title="B"
          disabled={false}
          handleClick={handleClickStop}
        />
        <CarIcon className={styles.car__icon} color={data.color} />
      </div>
    </div>
  );
}
