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

  return (
    <tr className={styles.winner__wrapper}>
      {currentCar && <td>{index + 1 + (pageWinners - 1) * WINNERS_PER_PAGE}</td>}
      {currentCar && currentCar.color !== DEFAULT_COLOR && (
        <td>
          <CarIcon className={styles.winner__carIcon} color={currentCar.color} positionX={0} />
        </td>
      )}
      {currentCar && <td>{currentCar.name}</td>}
      {currentCar && <td>{data.wins}</td>}
      {currentCar && <td>{data.time}</td>}
    </tr>
  );
}
