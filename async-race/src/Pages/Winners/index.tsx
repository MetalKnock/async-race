import React, { useCallback, useEffect } from 'react';
import { getWinners } from '../../api/raceAPI';
import ArrowIcon from '../../Components/Icons/ArrowIcon';
import Pagination from '../../Components/Pagination';
import Winner from '../../Components/Winner';
import { QUERY_ORDER, QUERY_SORT, TYPE_PAGINATION, WINNERS_PER_PAGE } from '../../const/const';
import useWinnersContext from '../../hooks/useWinnersContext';
import styles from './Winners.module.scss';

export default function Winners() {
  const {
    winners,
    pageWinners,
    winnersQuantity,
    querySort,
    setPageWinners,
    setWinners,
    setWinnersQuantity,
    setQuerySort,
  } = useWinnersContext();

  interface fetchApiProps {
    sort: QUERY_SORT;
    order: QUERY_ORDER;
  }

  const fetchApi = useCallback(
    async ({ sort, order }: fetchApiProps) => {
      const winnersData = await getWinners({
        page: pageWinners,
        limit: WINNERS_PER_PAGE,
        sort,
        order,
      });
      if (!winnersData) {
        throw Error('getWinners is null');
      }
      if (winnersData.winners && winnersData.quantity) {
        setWinners(winnersData.winners);
        setWinnersQuantity(winnersData.quantity);
      }
    },
    [pageWinners],
  );

  const handleClickId = () => {
    setQuerySort({
      sort: QUERY_SORT.id,
      order:
        querySort.sort === QUERY_SORT.id && querySort.order !== 'DESC'
          ? QUERY_ORDER.desc
          : QUERY_ORDER.asc,
    });
  };

  const handleClickWins = () => {
    setQuerySort({
      sort: QUERY_SORT.wins,
      order:
        querySort.sort === QUERY_SORT.wins && querySort.order !== 'ASC'
          ? QUERY_ORDER.asc
          : QUERY_ORDER.desc,
    });
  };

  const handleClickTime = () => {
    setQuerySort({
      sort: QUERY_SORT.time,
      order:
        querySort.sort === QUERY_SORT.time && querySort.order !== 'DESC'
          ? QUERY_ORDER.desc
          : QUERY_ORDER.asc,
    });
  };

  useEffect(() => {
    fetchApi(querySort);
  }, [fetchApi, querySort]);

  return (
    <div className={styles.winners}>
      <h1 className={styles.winners__title}>Winners ({winnersQuantity})</h1>
      <Pagination
        numberOfPages={Math.ceil(winnersQuantity / WINNERS_PER_PAGE)}
        page={pageWinners}
        setPage={setPageWinners}
        type={TYPE_PAGINATION.winners}
      />
      <table className={styles.winners__table}>
        <thead className={styles.winners__tableTitle}>
          <tr className={styles.winners__line}>
            <th className={styles.winners__cell}>№</th>
            <th className={styles.winners__cell}>
              <button
                className={`${styles.winners__button} button`}
                type="button"
                onClick={handleClickId}
              >
                <span>ID</span>
                {querySort.sort === QUERY_SORT.id && (
                  <ArrowIcon
                    className={`${styles.winners__arrowIcon} ${
                      querySort.order === QUERY_ORDER.asc ? styles.winners__arrowIcon_reverse : ''
                    }`}
                  />
                )}
              </button>
            </th>
            <th className={styles.winners__cell}>CAR</th>
            <th className={styles.winners__cell}>NAME</th>
            <th className={styles.winners__cell}>
              <button
                className={`${styles.winners__button} button`}
                type="button"
                onClick={handleClickWins}
              >
                <span>WINS</span>
                {querySort.sort === QUERY_SORT.wins && (
                  <ArrowIcon
                    className={`${styles.winners__arrowIcon} ${
                      querySort.order === QUERY_ORDER.asc ? styles.winners__arrowIcon_reverse : ''
                    }`}
                  />
                )}
              </button>
            </th>
            <th className={styles.winners__cell}>
              <button
                className={`${styles.winners__button} button`}
                type="button"
                onClick={handleClickTime}
              >
                <span>TIME</span>
                {querySort.sort === QUERY_SORT.time && (
                  <ArrowIcon
                    className={`${styles.winners__arrowIcon} ${
                      querySort.order === QUERY_ORDER.asc ? styles.winners__arrowIcon_reverse : ''
                    }`}
                  />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((winner, index) => (
            <Winner key={winner.id} data={winner} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
