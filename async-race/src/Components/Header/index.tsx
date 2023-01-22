import React from 'react';
import { Link } from 'react-router-dom';
import useGarageContext from '../../hooks/useGarageContext';
import styles from './Header.module.scss';

export default function Header() {
  const { isAnimatedCars, isStartedRace } = useGarageContext();

  return (
    <div className={styles.header}>
      <nav className={styles.header__navigation}>
        <ul className={styles.header__list}>
          <li className={styles.header__link}>
            {isStartedRace || isAnimatedCars.length !== 0 ? (
              <span>Garage</span>
            ) : (
              <Link to="/">Garage</Link>
            )}
          </li>
          <li className={styles.header__link}>
            {isStartedRace || isAnimatedCars.length !== 0 ? (
              <span>Winners</span>
            ) : (
              <Link to="/winners">Winners</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
