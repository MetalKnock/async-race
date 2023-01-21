import React from 'react';
import { deleteCar, deleteWinner, getCars, getWinner, getWinners } from '../../../api/raceAPI';
import { INIT_SELECTED_CAR, WINNERS_PER_PAGE } from '../../../const/const';
import useGarageContext from '../../../hooks/useGarageContext';
import useWinnersContext from '../../../hooks/useWinnersContext';
import { ICar } from '../../../types/data';
import { IGetCars } from '../../../types/raceAPI';
import styles from './CarControls.module.scss';

interface CarControlsProps {
  data: ICar;
}

export default function CarControls({ data }: CarControlsProps) {
  const { selectedCar, pageGarage, setSelectedCar, setCarsQuantity, setCars } = useGarageContext();
  const { pageWinners, setWinners, setWinnersQuantity } = useWinnersContext();

  const handleClickRemove = async () => {
    await deleteCar({ id: data.id });
    const winnersData = await getWinners({});
    if (!winnersData) {
      throw Error('getWinners is null');
    }
    if (!winnersData.winners) {
      throw Error('winners is null');
    }
    const currentCarInWinner = winnersData.winners.find((val) => val.id === data.id);
    if (currentCarInWinner) {
      await deleteWinner({ id: data.id });
      const winnersDataOther = await getWinners({ page: pageWinners, limit: WINNERS_PER_PAGE });
      if (!winnersDataOther) {
        throw Error('getWinners is null');
      }
      if (winnersDataOther.winners && winnersDataOther.quantity) {
        setWinners(winnersDataOther.winners);
        setWinnersQuantity(winnersDataOther.quantity);
      }
    }

    if (selectedCar.id === data.id) {
      setSelectedCar(INIT_SELECTED_CAR);
    }
    const carsData = await getCars({ pageGarage });
    if (!carsData) {
      throw Error('getCars is null');
    }
    setCarsQuantity(carsData.quantity);
    if (carsData.cars) {
      setCars(carsData.cars);
    }
  };

  const handleClickSelect = () => {
    setSelectedCar(data);
  };

  return (
    <div className={styles.carControls}>
      <button
        type="button"
        className={styles.carControls__select}
        disabled={selectedCar.id === data.id}
        onClick={handleClickSelect}
      >
        SELECT
      </button>
      <button
        type="button"
        className={styles.carControls__remove}
        disabled={false}
        onClick={handleClickRemove}
      >
        REMOVE
      </button>
    </div>
  );
}
