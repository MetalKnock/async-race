import React from 'react';
import { createCar, getCars } from '../../../api/raceAPI';
import { ICars } from '../../../types/data';
import { IGetCars } from '../../../types/raceAPI';
import { getRandomNData } from '../../../utils/common';
import Button from '../../Button';
import styles from './RaceButtons.module.scss';

interface RaceButtonsProps {
  page: number;
  setCarsQuantity: React.Dispatch<React.SetStateAction<number>>;
  setCars: React.Dispatch<React.SetStateAction<ICars>>;
}

export default function RaceButtons({ page, setCarsQuantity, setCars }: RaceButtonsProps) {
  const handleClickRandomButton = async () => {
    await Promise.all(getRandomNData(100).map((data) => createCar({ data })));
    const result: IGetCars = await getCars({ page });
    setCarsQuantity(result.quantity);
    if (result.cars) {
      setCars(result.cars);
    }
  };

  return (
    <div className={styles.raceButtons}>
      <button type="button">START</button>
      <button type="button">RESET</button>
      <Button
        className={styles.raceButtons__random}
        title="RANDOM"
        disabled={false}
        handleClick={handleClickRandomButton}
      />
    </div>
  );
}
