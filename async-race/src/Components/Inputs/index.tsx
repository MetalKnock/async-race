import React from 'react';
import CreateCar from './CreateCar';
import RaceButtons from './RaceButtons';
import UpdateCar from './UpdateCar';
import styles from './Inputs.module.scss';

export default function Inputs() {
  return (
    <div className={styles.inputs}>
      <CreateCar />
      <UpdateCar />
      <RaceButtons />
    </div>
  );
}
