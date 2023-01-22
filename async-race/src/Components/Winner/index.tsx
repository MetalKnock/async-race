import React, { useState, useCallback, useEffect } from 'react';
import { getCar } from '../../api/raceAPI';
import { DEFAULT_COLOR, WINNERS_PER_PAGE } from '../../const/const';
import useWinnersContext from '../../hooks/useWinnersContext';
import { ICar, IWinner } from '../../types/data';
import CarIcon from '../Icons/CarIcon';
import styles from './Winner.module.scss';

interface WinnerProps {
  data: IWinner;
  index: number;
}

export default function Winner({ data, index }: WinnerProps) {
  const { pageWinners } = useWinnersContext();
  const [currentCar, setCurrentCar] = useState<ICar | null>(null);

  const fetchApi = useCallback(async () => {
    const carData = await getCar({ id: data.id });
    if (!carData) {
      throw Error('getCar is null');
    }
    if (carData.car) {
      setCurrentCar(carData.car);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  if (!currentCar) {
    return <tr>{}</tr>;
  }
  return (
    <tr className={styles.winner__line}>
      <td className={styles.winner__cell}>{index + 1 + (pageWinners - 1) * WINNERS_PER_PAGE}</td>
      <td className={styles.winner__cell}>{data.id}</td>
      {currentCar.color !== DEFAULT_COLOR && (
        <td className={styles.winner__cell}>
          <CarIcon className={styles.winner__carIcon} color={currentCar.color} positionX={0} />
        </td>
      )}
      <td className={styles.winner__cell}>{currentCar.name}</td>
      <td className={styles.winner__cell}>{data.wins}</td>
      <td className={styles.winner__cell}>{data.time}</td>
    </tr>
  );
}
