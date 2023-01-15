import React from 'react';
import { ICar } from '../../types/data';
import CarIcon from '../SVG/CarIcon';
import styles from './Car.module.scss';

interface CarProps {
  data: ICar;
}

export default function Car({ data }: CarProps) {
  return (
    <div>
      <div>name: {data.name}</div>
      <div>id: {data.id}</div>
      <CarIcon className={styles.car__icon} color={data.color} />
    </div>
  );
}
