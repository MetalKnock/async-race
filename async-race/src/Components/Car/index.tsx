import React, { useState, useRef, useEffect } from 'react';
import { controlCarEngine, driveMode } from '../../api/raceAPI';
import { WIDTH_CAR_ICON } from '../../const/const';
import useGarageContext from '../../hooks/useGarageContext';
import { ICar, IRaceEngine } from '../../types/data';
import { easeInOutSine } from '../../utils/common';
import CarIcon from '../Icons/CarIcon';
import FinishIcon from '../Icons/FinishIcon';
import styles from './Car.module.scss';
import CarControls from './CarControls';

interface CarProps {
  carsLength: number;
  data: ICar;
}

export default function Car({ carsLength, data }: CarProps) {
  const {
    isAnimatedCars,
    raceEngines,
    isStartedRace,
    setFinishedCars,
    setAbortControllers,
    setIsAnimatedCars,
  } = useGarageContext();

  const [positionX, setPositionX] = useState(0);
  const [engineReady, setEngineReady] = useState(false);

  const requestId = useRef(0);
  const refRoad = useRef<HTMLDivElement | null>(null);
  const controller = useRef<AbortController | null>(null);

  const animation = (duration: number, callback: (progress: number) => void) => {
    let startAnimation: number | null = null;

    requestId.current = requestAnimationFrame(function measure(time) {
      if (!startAnimation) {
        startAnimation = time;
      }

      const progress = (time - startAnimation) / duration;

      callback(progress);

      if (progress < 1) {
        requestId.current = requestAnimationFrame(measure);
      }
    });
  };

  const startRace = async (raceEngine: IRaceEngine) => {
    const result = raceEngine.engine;
    let widthRoad = 0;
    if (refRoad.current) {
      widthRoad = refRoad.current.offsetWidth;
    }

    const duration = result.distance / result.velocity;
    const distance = widthRoad - WIDTH_CAR_ICON;
    animation(duration, (progress: number) => {
      const translate = easeInOutSine(progress) * distance;
      setPositionX(translate);
    });

    controller.current = new AbortController();
    setAbortControllers((arr) => {
      if (controller.current) {
        return [...arr, controller.current];
      }
      return arr;
    });

    const driveModeData = await driveMode({ id: data.id, signal: controller.current.signal });

    if (!driveModeData) {
      throw Error('driveMode in null');
    }

    if (!driveModeData.success) {
      cancelAnimationFrame(requestId.current);
    } else if (raceEngines.length === carsLength) {
      setFinishedCars((arr) => [...arr, { id: data.id, duration }]);
    }
  };

  const handleClickStart = async () => {
    setIsAnimatedCars((arr) => [...arr, { bool: true, id: data.id }]);

    const carEngineData = await controlCarEngine({ id: data.id, status: 'started' });

    if (!carEngineData) {
      throw Error('controlCarEngine is null');
    }

    setEngineReady(true);
    await startRace({ id: data.id, engine: carEngineData });
  };

  const handleClickStop = async () => {
    setEngineReady(false);
    if (controller.current) {
      controller.current.abort();
    }
    await controlCarEngine({ id: data.id, status: 'stopped' });
    cancelAnimationFrame(requestId.current);
    setPositionX(0);
    setIsAnimatedCars((cars) => cars.filter((car) => car.id !== data.id));
  };

  useEffect(() => {
    if (raceEngines.length === carsLength) {
      const raceEngine = raceEngines.find((val) => val.id === data.id);
      if (raceEngine) {
        setIsAnimatedCars((arr) => [...arr, { bool: true, id: data.id }]);
        startRace(raceEngine);
      }
    } else if (raceEngines.length > 0) {
      const raceEngine = raceEngines.find((val) => val.id === data.id);
      if (!raceEngine) {
        if (controller.current) {
          controller.current.abort();
        }
        cancelAnimationFrame(requestId.current);
        setPositionX(0);
        setIsAnimatedCars((cars) => cars.filter((car) => car.id !== data.id));
      }
    }
  }, [raceEngines]);

  return (
    <div className={styles.car}>
      <div className={styles.car__header}>
        <CarControls data={data} />
        <div className={styles.car__name}>{data.name}</div>
      </div>
      <div className={`${styles.car__track} ${styles.car__inner}`}>
        <button
          type="button"
          className={`${styles.carControls__select} button`}
          disabled={Boolean(isAnimatedCars.find((car) => car.id === data.id)) || isStartedRace}
          onClick={handleClickStart}
        >
          A
        </button>
        <button
          type="button"
          className={`${styles.carControls__select} button`}
          disabled={
            Boolean(!isAnimatedCars.find((car) => car.id === data.id)) ||
            !engineReady ||
            isStartedRace
          }
          onClick={handleClickStop}
        >
          B
        </button>
        <div className={styles.car__road} ref={refRoad}>
          <CarIcon className={styles.car__carIcon} color={data.color} positionX={positionX} />
          <FinishIcon className={styles.car__finishIcon} />
        </div>
      </div>
    </div>
  );
}
