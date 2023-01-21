import React from 'react';
import CreateCar from './CreateCar';
import styles from './Inputs.module.scss';
import RaceButtons from './RaceButtons';
import UpdateCar from './UpdateCar';

export default function Inputs() {
  return (
    <div className={styles.inputs}>
      <CreateCar />
      <UpdateCar />
      <RaceButtons />
    </div>
  );
}
