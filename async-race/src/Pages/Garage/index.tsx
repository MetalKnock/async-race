import React, { useState, useEffect, useCallback } from 'react';
import { getCars } from '../../api/raceAPI';
import Button from '../../Components/Button';
import Car from '../../Components/Car';
import Inputs from '../../Components/Inputs';
import { CARS_PER_PAGE, INIT_SELECTED_CAR } from '../../const/const';
import { ICar, ICars } from '../../types/data';

import styles from './Garage.module.scss';

export default function Garage() {
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState<ICars>([]);
  const [carsQuantity, setCarsQuantity] = useState(0);
  const [selectedCar, setSelectedCar] = useState<ICar>(INIT_SELECTED_CAR);

  const numberOfPages = Math.ceil(carsQuantity / CARS_PER_PAGE);

  const handleClickPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleClickNext = () => {
    if (page < numberOfPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (cars.length === 0 && carsQuantity > 0) {
      setPage(page - 1);
    }
  }, [cars]);

  const fetchApi = useCallback(async () => {
    const result = await getCars({ page });
    setCarsQuantity(result.quantity);
    if (result.cars) {
      setCars(result.cars);
    }
  }, [page]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <div className={styles.garage}>
      <Inputs
        page={page}
        selectedCar={selectedCar}
        carsQuantity={carsQuantity}
        setCarsQuantity={setCarsQuantity}
        setCars={setCars}
        setSelectedCar={setSelectedCar}
      />
      <h1 className={styles.garage__title}>Garage ({carsQuantity})</h1>
      <div className={styles.garage__page}>page #{page}</div>
      <Button
        className={styles.garage__buttonPrev}
        title="prev"
        disabled={page === 1}
        handleClick={handleClickPrev}
      />
      <Button
        className={styles.garage__buttonNext}
        title="next"
        disabled={page === numberOfPages}
        handleClick={handleClickNext}
      />
      <div>
        {cars.map((car) => (
          <Car
            key={car.id}
            data={car}
            page={page}
            selectedCar={selectedCar}
            setCarsQuantity={setCarsQuantity}
            setCars={setCars}
            setSelectedCar={setSelectedCar}
          />
        ))}
      </div>
    </div>
  );
}
