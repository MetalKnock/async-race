import React, { useState, useRef, useEffect } from 'react';
import { controlCarEngine, deleteCar, driveMode, getCars } from '../../api/raceAPI';
import { INIT_SELECTED_CAR } from '../../const/const';
import { ICar, ICars } from '../../types/data';
import { IGetCars } from '../../types/raceAPI';
import Button from '../Button';
import CarIcon from '../Icons/CarIcon';
import FinishIcon from '../Icons/FinishIcon';
import styles from './Car.module.scss';

interface CarProps {
  data: ICar;
  selectedCar: ICar;
  page: number;
  setCarsQuantity: (value: React.SetStateAction<number>) => void;
  setCars: (value: React.SetStateAction<ICars>) => void;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
}

export default function Car({
  data,
  selectedCar,
  page,
  setCarsQuantity,
  setCars,
  setSelectedCar,
}: CarProps) {
  const [velocity, setVelocity] = useState(0);
  const [distance, setDistance] = useState(0);
  const [widthRoad, setWidthRoad] = useState(0);
  const [positionX, setPositionX] = useState(0);

  const refRoad = useRef<HTMLDivElement | null>(null);

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

  const handleClickStart = async () => {
    const result = await controlCarEngine({ id: data.id, status: 'started' });
    setVelocity(result.velocity);
    setDistance(result.distance);
    console.log(velocity, distance);
    const a = await driveMode({ id: data.id });
    console.log(a);
  };

  const handleClickStop = async () => {
    const result = await controlCarEngine({ id: data.id, status: 'stopped' });
    setVelocity(result.velocity);
    setDistance(result.distance);
  };

  useEffect(() => {
    if (refRoad.current && velocity) {
      setWidthRoad(refRoad.current.offsetWidth);
    }
  }, [velocity]);

  useEffect(() => {
    if (widthRoad) setPositionX(22);
  }, [widthRoad]);

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
        <div className={styles.car__road} ref={refRoad}>
          <CarIcon className={styles.car__carIcon} color={data.color} positionX={positionX} />
          <FinishIcon className={styles.car__finishIcon} />
        </div>
      </div>
    </div>
  );
}
