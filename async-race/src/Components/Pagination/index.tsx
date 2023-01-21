import React from 'react';
import { CARS_PER_PAGE } from '../../const/const';
import useGarageContext from '../../hooks/useGarageContext';
import styles from './Pagination.module.scss';

export default function Pagination() {
  const { carsQuantity, pageGarage, setPageGarage, setRaceEngines } = useGarageContext();

  const numberOfPages = Math.ceil(carsQuantity / CARS_PER_PAGE);

  const handleClickPrev = () => {
    if (pageGarage > 1) {
      setPageGarage(pageGarage - 1);
      setRaceEngines([]);
    }
  };

  const handleClickNext = () => {
    if (pageGarage < numberOfPages) {
      setPageGarage(pageGarage + 1);
      setRaceEngines([]);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__page}>page #{pageGarage}</div>
      <button
        className={styles.pagination__buttonPrev}
        type="button"
        disabled={pageGarage === 1}
        onClick={handleClickPrev}
      >
        PREV
      </button>
      <button
        className={styles.pagination__buttonNext}
        type="button"
        disabled={pageGarage === numberOfPages}
        onClick={handleClickNext}
      >
        NEXT
      </button>
    </div>
  );
}
