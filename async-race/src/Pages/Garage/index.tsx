import React, { useEffect, useCallback } from 'react';
import { getCars } from '../../api/raceAPI';
import Car from '../../Components/Car';
import Inputs from '../../Components/Inputs';
import ModalWin from '../../Components/ModalWin';
import Pagination from '../../Components/Pagination';
import { CARS_PER_PAGE, TYPE_PAGINATION } from '../../const/const';
import useGarageContext from '../../hooks/useGarageContext';

import styles from './Garage.module.scss';

export default function Garage() {
  const { isOpenModal, pageGarage, cars, carsQuantity, setPageGarage, setCars, setCarsQuantity } =
    useGarageContext();

  const fetchApi = useCallback(async () => {
    const carsData = await getCars({ pageGarage });
    if (!carsData) {
      throw Error('getCars is null');
    }
    setCarsQuantity(carsData.quantity);
    if (carsData.cars) {
      setCars(carsData.cars);
    }
  }, [pageGarage]);

  useEffect(() => {
    if (cars.length === 0 && carsQuantity > 0) {
      setPageGarage(pageGarage - 1);
    }
  }, [cars]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <main className={styles.garage}>
      <div className={styles.garage__inner}>
        <Inputs />
        <div className={styles.garage__column}>
          <h2 className={styles.garage__title}>Garage ({carsQuantity})</h2>
          <Pagination
            numberOfPages={Math.ceil(carsQuantity / CARS_PER_PAGE)}
            page={pageGarage}
            setPage={setPageGarage}
            type={TYPE_PAGINATION.garage}
          />
        </div>
      </div>

      <div className={styles.garage__cars}>
        {isOpenModal && <ModalWin />}
        {cars.map((car) => (
          <Car key={car.id} carsLength={cars.length} data={car} />
        ))}
      </div>
    </main>
  );
}
