import React from 'react';
import { CARS_PER_PAGE } from '../../const/const';
import Button from '../Button';
import styles from './Pagination.module.scss';

interface PagintaionProps {
  carsQuantity: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ carsQuantity, page, setPage }: PagintaionProps) {
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

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__page}>page #{page}</div>
      <Button
        className={styles.pagination__buttonPrev}
        title="PREV"
        disabled={page === 1}
        handleClick={handleClickPrev}
      />
      <Button
        className={styles.pagination__buttonNext}
        title="NEXT"
        disabled={page === numberOfPages}
        handleClick={handleClickNext}
      />{' '}
    </div>
  );
}
