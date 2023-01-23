import React, { useState, useEffect } from 'react';
import { DIGITS_AFTER_DECIMAL_POINT_TIME } from '../../const/const';
import useGarageContext from '../../hooks/useGarageContext';
import { convertMillisecondsToSeconds } from '../../utils/common';
import styles from './ModalWin.module.scss';

export default function ModalWin() {
  const { finishedCars, cars } = useGarageContext();
  const [name, setName] = useState('');

  useEffect(() => {
    const currentCar = cars.find((car) => car.id === finishedCars[0].id);
    if (currentCar) {
      setName(currentCar.name);
    }
  }, []);

  return (
    <div className={styles.modalWin}>
      <h3>Winner</h3>
      <h4>Car: {name}</h4>
      <h4>
        Time:{' '}
        {convertMillisecondsToSeconds(finishedCars[0].duration, DIGITS_AFTER_DECIMAL_POINT_TIME)}
      </h4>
    </div>
  );
}
