import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PATH_ROUTER } from '../../const/const';
import useGarageContext from '../../hooks/useGarageContext';
import styles from './Header.module.scss';

export default function Header() {
  const { isAnimatedCars, isStartedRace } = useGarageContext();
  const { pathname } = useLocation();
  // const styleLink =
  //   pathname === PATH_ROUTER.winners ? styles.header__link_winners : styles.header__link_garage;

  return (
    <header className={styles.header}>
      <nav className={styles.header__navigation}>
        <ul className={styles.header__list}>
          <li className={styles.header__item}>
            {isStartedRace || isAnimatedCars.length !== 0 ? (
              <span
                className={`${styles.header__link} ${
                  pathname === PATH_ROUTER.garage ? styles.header__link_active : ''
                }`}
              >
                GARAGE
              </span>
            ) : (
              <Link
                to="/"
                className={`${styles.header__link} ${
                  pathname === PATH_ROUTER.garage ? styles.header__link_active : ''
                }`}
              >
                GARAGE
              </Link>
            )}
          </li>
          <li className={styles.header__item}>
            {isStartedRace || isAnimatedCars.length !== 0 ? (
              <span
                className={`${styles.header__link} ${
                  pathname === PATH_ROUTER.winners ? styles.header__link_active : ''
                }`}
              >
                WINNERS
              </span>
            ) : (
              <Link
                to="/winners"
                className={`${styles.header__link} ${
                  pathname === PATH_ROUTER.winners ? styles.header__link_active : ''
                }`}
              >
                WINNERS
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
