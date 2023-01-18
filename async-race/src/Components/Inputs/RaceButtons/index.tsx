import React from 'react';
import { controlCarEngine, createCar, getCars } from '../../../api/raceAPI';
import { ICars, IRaceEngines } from '../../../types/data';
import { getRandomNData } from '../../../utils/common';
import Button from '../../Button';
import styles from './RaceButtons.module.scss';

interface RaceButtonsProps {
  page: number;
  raceEngines: IRaceEngines;
  setCarsQuantity: React.Dispatch<React.SetStateAction<number>>;
  setCars: React.Dispatch<React.SetStateAction<ICars>>;
  setRaceEngines: React.Dispatch<React.SetStateAction<IRaceEngines>>;
}

export default function RaceButtons({
  page,
  raceEngines,
  setCarsQuantity,
  setCars,
  setRaceEngines,
}: RaceButtonsProps) {
  const handleClickRandomButton = async () => {
    await Promise.all(getRandomNData(100).map((data) => createCar({ data })));
    const result = await getCars({ page });
    setCarsQuantity(result.quantity);
    if (result.cars) {
      setCars(result.cars);
    }
  };

  const handleClickStartRace = async () => {
    const result = await getCars({ page });
    if (result.cars) {
      setRaceEngines(
        await Promise.all(
          result.cars.map(async (car) => ({
            id: car.id,
            engine: await controlCarEngine({ id: car.id, status: 'started' }),
          })),
        ),
      );
    }
  };

  const handleClickReset = async () => {
    const result = await getCars({ page });

    if (result.cars) {
      let copyRaceEngines = [...raceEngines];
      result.cars.map(async (car) => {
        await controlCarEngine({ id: car.id, status: 'stopped' });
        if (copyRaceEngines.length > 1) {
          copyRaceEngines = copyRaceEngines.filter((raceEngine) => raceEngine.id !== car.id);
          setRaceEngines(copyRaceEngines);
        } else {
          setRaceEngines([{ id: 0, engine: { velocity: 0, distance: 0 } }]);
        }
      });
    }
  };

  return (
    <div className={styles.raceButtons}>
      <button type="button" onClick={handleClickStartRace}>
        START
      </button>
      <button type="button" onClick={handleClickReset}>
        RESET
      </button>
      <Button
        className={styles.raceButtons__random}
        title="RANDOM"
        disabled={false}
        handleClick={handleClickRandomButton}
      />
    </div>
  );
}
