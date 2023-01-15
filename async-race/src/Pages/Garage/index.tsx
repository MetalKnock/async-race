import React, { useState, useEffect, useRef } from 'react';
import Car from '../../Components/Car';
import { Path, URL } from '../../const/const';
import { ICar, ICarCreate, ICars } from '../../types/data';
import { getRandomNData } from '../../utils/common';
import styles from './Garage.module.scss';

export default function Garage() {
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState<ICars>([]);
  const [carsQuantity, setCarsQuantity] = useState(0);
  const [selectedCar, setSelectedCar] = useState<ICar>({ name: '', color: '#000000', id: 0 });
  const [inputNameUpdate, setInputNameUpdate] = useState('');
  const [inputColorUpdate, setInputColorUpdate] = useState('#000000');

  const name = useRef<HTMLInputElement | null>(null);
  const color = useRef<HTMLInputElement | null>(null);
  const nameUpdate = useRef<HTMLInputElement | null>(null);
  const colorUpdate = useRef<HTMLInputElement | null>(null);

  const getCarsOnCurrentPage = async () => {
    try {
      const response = await fetch(`${URL}${Path.garage}?_limit=7&_page=${page}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      setCarsQuantity(Number(response.headers.get('x-total-count')));
      const result: ICars | null = await response.json();
      if (result) {
        setCars(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createCar = async (data: ICarCreate) => {
    await fetch(`${URL}${Path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const updateCar = async (data: ICarCreate) => {
    await fetch(`${URL}${Path.garage}/${selectedCar.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const handleClickPrev = () => page > 1 && setPage(page - 1);

  const handleClickNext = () => {
    if (page < Math.ceil(carsQuantity / 7)) {
      setPage(page + 1);
    }
  };

  const handleClickRandomButton = () => {
    Promise.all(getRandomNData(100).map((data) => createCar(data))).then(() => {
      getCarsOnCurrentPage();
    });
  };

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.current && color.current) {
      const data: ICarCreate = { name: name.current.value, color: color.current.value };
      Promise.resolve(createCar(data)).then(() => getCarsOnCurrentPage());
    }
  };

  const handleSubmitUpdate = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameUpdate.current && colorUpdate.current) {
      const data: ICarCreate = { name: nameUpdate.current.value, color: colorUpdate.current.value };
      Promise.resolve(updateCar(data)).then(() => getCarsOnCurrentPage());
    }
  };

  const handleChangeNameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setInputNameUpdate(e.target.value);
    }
  };
  const handleChangeColorUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setInputColorUpdate(e.target.value);
    }
  };

  useEffect(() => {
    if (cars.length === 0 && carsQuantity > 0) {
      setPage(page - 1);
    }
  }, [cars]);

  useEffect(() => {
    getCarsOnCurrentPage();
  }, [page]);

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

          <button type="submit">update</button>
        </form>
        <div className={styles.garage__inputsButtons}>
          <button type="button">start</button>
          <button type="button">reset</button>
          <button className={styles.garage__1} type="button" onClick={handleClickRandomButton}>
            random
          </button>
        </div>
      </div>
      <h1 className={styles.garage__title}>Garage ({carsQuantity})</h1>
      <div className={styles.garage__page}>page #{page}</div>
      <button className={styles.garage__buttonPrev} type="button" onClick={handleClickPrev}>
        Prev
      </button>
      <button className={styles.garage__buttonNext} type="button" onClick={handleClickNext}>
        Next
      </button>

      <div>
        {cars.map((car) => (
          <Car
            key={car.id}
            data={car}
            selectedCar={selectedCar}
            getCarsOnCurrentPage={getCarsOnCurrentPage}
            setSelectedCar={setSelectedCar}
          />
        ))}
      </div>
    </div>
  );
}
