import React from 'react';
import { ICar, ICars } from '../../types/data';
import CreateCar from './CreateCar';
import styles from './Inputs.module.scss';
import RaceButtons from './RaceButtons';
import UpdateCar from './UpdateCar';

interface InputsProps {
  page: number;
  selectedCar: ICar;
  carsQuantity: number;
  setCarsQuantity: React.Dispatch<React.SetStateAction<number>>;
  setCars: React.Dispatch<React.SetStateAction<ICars>>;
  setSelectedCar: React.Dispatch<React.SetStateAction<ICar>>;
}

export default function Inputs({
  page,
  selectedCar,
  carsQuantity,
  setCarsQuantity,
  setCars,
  setSelectedCar,
}: InputsProps) {
  return (
    <div className={styles.inputs}>
      <CreateCar page={page} setCarsQuantity={setCarsQuantity} setCars={setCars} />
      <UpdateCar
        page={page}
        selectedCar={selectedCar}
        carsQuantity={carsQuantity}
        setCarsQuantity={setCarsQuantity}
        setCars={setCars}
        setSelectedCar={setSelectedCar}
      />
      <RaceButtons page={page} setCarsQuantity={setCarsQuantity} setCars={setCars} />
    </div>
  );
}
