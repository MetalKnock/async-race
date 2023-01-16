import { ICars, ICarCreate } from '../types/data';
import { PATH, CARS_PER_PAGE, BASE } from '../const/const';

export const getCarsOnCurrentPage = async (page: number) => {
  const response = await fetch(`${BASE}${PATH.garage}?_limit=${CARS_PER_PAGE}&_page=${page}`);
  const quantity = Number(response.headers.get('x-total-count'));
  const result: ICars | null = await response.json();

  return { result, quantity };
};

export const createCar = async (data: ICarCreate) => {
  await fetch(`${URL}${PATH.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const updateCar = async (data: ICarCreate, idSelectedCar: number) => {
  await fetch(`${BASE}${PATH.garage}/${idSelectedCar}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
