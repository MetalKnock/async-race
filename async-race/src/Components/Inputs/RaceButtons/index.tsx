import React from 'react';
import { controlCarEngine, createCar, getCars } from '../../../api/raceAPI';
import { INIT_RACE_ENGINE } from '../../../const/const';
import useGarageContext from '../../../hooks/useGarageContext';
import { getRandomNData } from '../../../utils/common';
import styles from './RaceButtons.module.scss';

export default function RaceButtons() {
  const { pageGarage, raceEngines, setCarsQuantity, setCars, setRaceEngines } = useGarageContext();

  const handleClickRandomButton = async () => {
    await Promise.all(getRandomNData(100).map((data) => createCar({ data })));
    const result = await getCars({ pageGarage });
    setCarsQuantity(result.quantity);
    if (result.cars) {
      setCars(result.cars);
    }
  };

  const handleClickStartRace = async () => {
    const result = await getCars({ pageGarage });
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
    const result = await getCars({ pageGarage });

    if (result.cars) {
      let copyRaceEngines = [...raceEngines];
      result.cars.map(async (car) => {
        await controlCarEngine({ id: car.id, status: 'stopped' });
        if (copyRaceEngines.length > 1) {
          copyRaceEngines = copyRaceEngines.filter((raceEngine) => raceEngine.id !== car.id);
          setRaceEngines(copyRaceEngines);
        } else {
          setRaceEngines([INIT_RACE_ENGINE]);
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
      <button
        className={styles.raceButtons__random}
        type="button"
        disabled={false}
        onClick={handleClickRandomButton}
      >
        RANDOM
      </button>
    </div>
  );
}
