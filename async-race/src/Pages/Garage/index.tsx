import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createCar, getCarsOnCurrentPage, updateCar } from '../../api/Car';
import Button from '../../Components/Button';
import Car from '../../Components/Car';
import { CARS_PER_PAGE, DEFAULT_COLOR_INPUT, INIT_SELECTED_CAR } from '../../const/const';
import { ICar, ICarCreate, ICars, IGetCars } from '../../types/data';
import { getRandomNData } from '../../utils/common';
import styles from './Garage.module.scss';

export default function Garage() {
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState<ICars>([]);
  const [carsQuantity, setCarsQuantity] = useState(0);
  const [selectedCar, setSelectedCar] = useState<ICar>(INIT_SELECTED_CAR);
  const [inputNameUpdate, setInputNameUpdate] = useState('');
  const [inputColorUpdate, setInputColorUpdate] = useState(DEFAULT_COLOR_INPUT);

  const name = useRef<HTMLInputElement | null>(null);
  const color = useRef<HTMLInputElement | null>(null);
  const nameUpdate = useRef<HTMLInputElement | null>(null);
  const colorUpdate = useRef<HTMLInputElement | null>(null);

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

  const handleClickRandomButton = async () => {
    await Promise.all(getRandomNData(100).map((data) => createCar(data)));
    const result: IGetCars = await getCarsOnCurrentPage(page);
    setCarsQuantity(result.quantity);
    if (result.result) {
      setCars(result.result);
    }
  };

  const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.current && color.current) {
      const data: ICarCreate = {
        name: name.current.value,
        color: color.current.value,
      };
      await createCar(data);
      const result: IGetCars = await getCarsOnCurrentPage(page);
      setCarsQuantity(result.quantity);
      if (result.result) {
        setCars(result.result);
      }
    }
  };

  const handleSubmitUpdate = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameUpdate.current && colorUpdate.current) {
      const data: ICarCreate = {
        name: nameUpdate.current.value,
        color: colorUpdate.current.value,
      };
      await updateCar(data, selectedCar.id);
      const result: IGetCars = await getCarsOnCurrentPage(page);
      setCarsQuantity(result.quantity);
      if (result.result) {
        setCars(result.result);
      }
      setSelectedCar(INIT_SELECTED_CAR);
    }
  };

  const handleChangeNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputNameUpdate(e.target.value);
    }
  };
  const handleChangeColorUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setInputColorUpdate(e.target.value);
    }
  };

  useEffect(() => {
    if (cars.length === 0 && carsQuantity > 0) {
      setPage(page - 1);
    }
  }, [cars]);

  const fetchApi = useCallback(async () => {
    const result = await getCarsOnCurrentPage(page);
    setCarsQuantity(result.quantity);
    if (result.result) {
      setCars(result.result);
    }
  }, [page]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  useEffect(() => {
    if (carsQuantity > 0) {
      setInputNameUpdate(selectedCar.name);
      setInputColorUpdate(selectedCar.color);
    }
  }, [selectedCar]);

  return (
    <div className={styles.garage}>
      <div className={styles.garage__inputs}>
        <form className={styles.garage__inputsCreate} onSubmit={handleSubmitCreate}>
          <input type="text" ref={name} />
          <input type="color" ref={color} />
          <button type="submit">create</button>
        </form>
        <form className={styles.garage__inputsUpdate} onSubmit={handleSubmitUpdate}>
          <input
            type="text"
            ref={nameUpdate}
            value={inputNameUpdate}
            // selectedCar.name
            onChange={handleChangeNameUpdate}
          />

          <input
            type="color"
            ref={colorUpdate}
            value={inputColorUpdate}
            // selectedCar.colors
            onChange={handleChangeColorUpdate}
          />

          <button type="submit" disabled={selectedCar === INIT_SELECTED_CAR}>
            update
          </button>
        </form>
        <div className={styles.garage__inputsButtons}>
          <button type="button">start</button>
          <button type="button">reset</button>
          <Button
            className={styles.garage__random}
            title="random"
            disabled={false}
            handleClick={handleClickRandomButton}
          />
        </div>
      </div>
      <h1 className={styles.garage__title}>Garage ({carsQuantity})</h1>
      <div className={styles.garage__page}>page #{page}</div>
      <Button
        className={styles.garage__buttonPrev}
        title="prev"
        disabled={page === 1}
        handleClick={handleClickPrev}
      />
      <Button
        className={styles.garage__buttonNext}
        title="next"
        disabled={page === numberOfPages}
        handleClick={handleClickNext}
      />
      <div>
        {cars.map((car) => (
          <Car
            key={car.id}
            data={car}
            page={page}
            selectedCar={selectedCar}
            setCarsQuantity={setCarsQuantity}
            setCars={setCars}
            getCarsOnCurrentPage={getCarsOnCurrentPage}
            setSelectedCar={setSelectedCar}
          />
        ))}
      </div>
    </div>
  );
}
