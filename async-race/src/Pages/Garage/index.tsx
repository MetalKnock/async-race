import React, { useEffect, useCallback } from 'react';
import { getCars } from '../../api/raceAPI';
import Car from '../../Components/Car';
import Inputs from '../../Components/Inputs';
import Pagination from '../../Components/Pagination';
import useGarageContext from '../../hooks/useGarageContext';

import styles from './Garage.module.scss';

export default function Garage() {
  const { pageGarage, cars, carsQuantity, setPageGarage, setCars, setCarsQuantity } =
    useGarageContext();

  useEffect(() => {
    if (cars.length === 0 && carsQuantity > 0) {
      setPageGarage(pageGarage - 1);
    }
  }, [cars]);

  const fetchApi = useCallback(async () => {
    const result = await getCars({ pageGarage });
    setCarsQuantity(result.quantity);
    if (result.cars) {
      setCars(result.cars);
    }
  }, [pageGarage]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <div className={styles.garage}>
      <Inputs />
      <h1 className={styles.garage__title}>Garage ({carsQuantity})</h1>
      <Pagination />
      <div>
        {cars.map((car) => (
          <Car key={car.id} carsLength={cars.length} data={car} />
        ))}
      </div>
    </div>
  );
}
