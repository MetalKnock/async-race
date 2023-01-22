import React, { useEffect } from 'react';
import {
  controlCarEngine,
  createCar,
  createWinner,
  getCars,
  getWinners,
  updateWinner,
} from '../../../api/raceAPI';
import { INIT_RACE_ENGINE } from '../../../const/const';
import useGarageContext from '../../../hooks/useGarageContext';
import { IFinishedCars, IWinner } from '../../../types/data';

import { convertMillisecondsToSeconds, getRandomNData } from '../../../utils/common';
import styles from './RaceButtons.module.scss';

export default function RaceButtons() {
  const {
    finishedCars,
    pageGarage,
    raceEngines,
    abortContollers,
    setCarsQuantity,
    setCars,
    setRaceEngines,
    setIsOpenModal,
    setFinishedCars,
    setAbortControllers,
  } = useGarageContext();

  const handleClickRandomButton = async () => {
    await Promise.all(getRandomNData(100).map((data) => createCar({ data })));
    const carsData = await getCars({ pageGarage });
    if (!carsData) {
      throw Error('getCars is null');
    }
    setCarsQuantity(carsData.quantity);
    if (carsData.cars) {
      setCars(carsData.cars);
    }
  };

  const handleClickStartRace = async () => {
    const carsData = await getCars({ pageGarage });
    if (!carsData) {
      throw Error('getCars is null');
    }
    if (carsData.cars) {
      setRaceEngines(
        await Promise.all(
          carsData.cars.map(async (car) => {
            const carEngineData = await controlCarEngine({ id: car.id, status: 'started' });
            if (!carEngineData) {
              throw Error('controlCarEngine is null');
            }
            return {
              id: car.id,
              engine: carEngineData,
            };
          }),
        ),
      );
    }
  };

  const addFirstFinishedInWinners = async (firstFinished: IFinishedCars) => {
    setIsOpenModal(true);
    const winnersData = await getWinners({});
    if (!winnersData) {
      throw Error('getWinners in null');
    }
    if (winnersData.winners) {
      const currentObj: IWinner | undefined = winnersData.winners.find(
        (val) => val.id === firstFinished.id,
      );
      const time = convertMillisecondsToSeconds(firstFinished.duration, 3);
      if (currentObj) {
        await updateWinner({
          data: {
            wins: currentObj.wins + 1,
            time: currentObj.time < time ? currentObj.time : time,
          },
          id: firstFinished.id,
        });
      } else {
        await createWinner({ data: { id: firstFinished.id, time, wins: 1 } });
      }
    }
  };

  const handleClickReset = async () => {
    abortContollers.map((val) => val.abort());
    setAbortControllers([]);
    const carsData = await getCars({ pageGarage });
    if (!carsData) {
      throw Error('getCars is null');
    }
    if (!carsData.cars) {
      throw Error('cars is null');
    }

    let copyRaceEngines = [...raceEngines];
    await Promise.all(
      carsData.cars.map(async (car) => {
        await controlCarEngine({ id: car.id, status: 'stopped' });
        if (copyRaceEngines.length > 1) {
          copyRaceEngines = copyRaceEngines.filter((raceEngine) => raceEngine.id !== car.id);
          setRaceEngines(copyRaceEngines);
        } else {
          setRaceEngines([INIT_RACE_ENGINE]);
        }
      }),
    );
    setIsOpenModal(false);
    setFinishedCars([]);
  };

  useEffect(() => {
    if (finishedCars.length === 1 && raceEngines.length > 0) {
      addFirstFinishedInWinners(finishedCars[0]);
    }
  }, [finishedCars]);

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
