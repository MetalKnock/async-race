import React from 'react';
import { TYPE_PAGINATION } from '../../const/const';
import useGarageContext from '../../hooks/useGarageContext';
import styles from './Pagination.module.scss';

interface PaginationProps {
  numberOfPages: number;
  page: number;
  type: TYPE_PAGINATION;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ numberOfPages, page, type, setPage }: PaginationProps) {
  const { setRaceEngines } = useGarageContext();

  const handleClickPrev = () => {
    if (page > 1) {
      setPage(page - 1);
      if (type === TYPE_PAGINATION.garage) {
        setRaceEngines([]);
      }
    }
  };

  const handleClickNext = () => {
    if (page < numberOfPages) {
      setPage(page + 1);
      if (type === TYPE_PAGINATION.garage) {
        setRaceEngines([]);
      }
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__page}>page #{page}</div>
      <button
        className={styles.pagination__buttonPrev}
        type="button"
        disabled={page === 1}
        onClick={handleClickPrev}
      >
        PREV
      </button>
      <button
        className={styles.pagination__buttonNext}
        type="button"
        disabled={page === numberOfPages || numberOfPages === 0}
        onClick={handleClickNext}
      >
        NEXT
      </button>
    </div>
  );
}
