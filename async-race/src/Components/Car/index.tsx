import React, { useState, useRef, useEffect } from 'react';
import { controlCarEngine, driveMode } from '../../api/raceAPI';
import { WIDTH_CAR_ICON } from '../../const/const';
import { ICar, ICars, IRaceEngine, IRaceEngines } from '../../types/data';
import { easeInOutSine } from '../../utils/common';
import Button from '../Button';
import CarIcon from '../Icons/CarIcon';
import FinishIcon from '../Icons/FinishIcon';
import styles from './Car.module.scss';
import CarControls from './CarControls';

interface CarProps {
  carsLength: number;
  data: ICar;
  selectedCar: ICar;
  page: number;
  raceEngines: IRaceEngines;
  setCarsQuantity: (value: React.SetStateAction<number>) => void;
  setCars: (value: React.SetStateAction<ICars>) => void;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
}

export default function Car({
  carsLength,
  data,
  selectedCar,
  page,
  raceEngines,
  setCarsQuantity,
  setCars,
  setSelectedCar,
}: CarProps) {
  const [positionX, setPositionX] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  const requestId = useRef(0);
  const refRoad = useRef<HTMLDivElement | null>(null);

  const animation = (duration: number, callback: (progress: number) => void) => {
    let startAmination: number | null = null;

    requestId.current = requestAnimationFrame(function measure(time) {
      if (!startAmination) {
        startAmination = time;
      }

      const progress = (time - startAmination) / duration;

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
    if (!(await driveMode({ id: data.id })).success) {
      cancelAnimationFrame(requestId.current);
    }
    setIsAnimated(false);
  };

  const handleClickStart = async () => {
    setIsAnimated(true);
    const result = await controlCarEngine({ id: data.id, status: 'started' });
    await startRace({ id: data.id, engine: result });
  };

  const handleClickStop = async () => {
    await controlCarEngine({ id: data.id, status: 'stopped' });
    cancelAnimationFrame(requestId.current);
    setPositionX(0);
    setIsAnimated(false);
  };

  useEffect(() => {
    if (raceEngines.length === carsLength) {
      const raceEngine = raceEngines.find((val) => val.id === data.id);
      if (raceEngine) {
        startRace(raceEngine);
      }
    } else if (raceEngines.length > 0) {
      const raceEngine = raceEngines.find((val) => val.id === data.id);
      if (!raceEngine) {
        cancelAnimationFrame(requestId.current);
        setPositionX(0);
      }
    }
  }, [raceEngines]);

  return (
    <div className={styles.car}>
      <div className={styles.car__header}>
        <CarControls
          data={data}
          page={page}
          selectedCar={selectedCar}
          setCarsQuantity={setCarsQuantity}
          setCars={setCars}
          setSelectedCar={setSelectedCar}
        />
        <div className={styles.car__name}>{data.name}</div>
      </div>
      <div className={`${styles.car__track} ${styles.car__inner}`}>
        <Button
          className={styles.car__start}
          title="A"
          disabled={isAnimated}
          handleClick={handleClickStart}
        />
        <Button
          className={styles.car__stop}
          title="B"
          disabled={!isAnimated}
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
