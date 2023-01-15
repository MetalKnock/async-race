import React, { useState, useEffect } from 'react';
import Car from '../../Components/Car';
import { Path, URL } from '../../const/const';
import { ICarCreate, ICars } from '../../types/data';
import { getRandomNData } from '../../utils/common';
import styles from './Garage.module.scss';

export default function Garage() {
  const [page, setPage] = useState(1);

  const [cars, setCars] = useState<ICars>([]);
  const [carsQuantity, setCarsQuantity] = useState(0);

  const getCarsOnCurrentPage = async () => {
    try {
      const response = await fetch(`${URL}${Path.garage}?_limit=7&_page=${page}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      setCarsQuantity(Number(response.headers.get('x-total-count')));
      const result: ICars | null = await response.json();
      if (result) {
        setCars(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createCar = async (data: ICarCreate) => {
    await fetch(`${URL}${Path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const handleClickPrev = () => page > 1 && setPage(page - 1);

  const handleClickNext = () => {
    if (page < Math.ceil(carsQuantity / 7)) {
      setPage(page + 1);
    }
  };

  const handleClickRandomButton = () => {
    Promise.all(getRandomNData(100).map((data) => createCar(data))).then(() => {
      getCarsOnCurrentPage();
    });
  };

  useEffect(() => {
    getCarsOnCurrentPage();
  }, [page]);

  return (
    <div className={styles.garage}>
      <h1 className={styles.garage__title}>Garage ({carsQuantity})</h1>
      <div className={styles.garage__page}>page #{page}</div>
      <button className={styles.garage__buttonPrev} type="button" onClick={handleClickPrev}>
        Prev
      </button>
      <button className={styles.garage__buttonNext} type="button" onClick={handleClickNext}>
        Next
      </button>
      <button className={styles.garage__1} type="button" onClick={handleClickRandomButton}>
        random
      </button>
      <div>
        {cars.map((car) => (
          <Car key={car.id} data={car} />
        ))}
      </div>
    </div>
  );
}
