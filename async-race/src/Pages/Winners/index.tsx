import React, { useCallback, useEffect } from 'react';
import { getWinners } from '../../api/raceAPI';
import Pagination from '../../Components/Pagination';
import Winner from '../../Components/Winner';
import { TYPE_PAGINATION, WINNERS_PER_PAGE } from '../../const/const';
import useWinnersContext from '../../hooks/useWinnersContext';
import styles from './Winners.module.scss';

export default function Winners() {
  const { winners, pageWinners, winnersQuantity, setPageWinners, setWinners, setWinnersQuantity } =
    useWinnersContext();

  const fetchApi = useCallback(async () => {
    const winnersData = await getWinners({ page: pageWinners, limit: WINNERS_PER_PAGE });
    if (!winnersData) {
      throw Error('getWinners is null');
    }
    if (winnersData.winners && winnersData.quantity) {
      setWinners(winnersData.winners);
      setWinnersQuantity(winnersData.quantity);
    }
  }, [pageWinners]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);
  return (
    <div className={styles.winners}>
      <h1 className={styles.garage__title}>Winners ({1})</h1>
      <Pagination
        numberOfPages={Math.ceil(winnersQuantity / WINNERS_PER_PAGE)}
        page={pageWinners}
        setPage={setPageWinners}
        type={TYPE_PAGINATION.winners}
      />
      <table>
        <thead className={styles.winners__title}>
          <tr>
            <td>PAGE</td>
            <td>CAR</td>
            <td>NAME</td>
            <td>WINS</td>
            <td>TIME</td>
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
