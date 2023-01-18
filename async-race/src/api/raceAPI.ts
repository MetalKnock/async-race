import {
  controlCarEngineProps,
  createCarProps,
  deleteCarProps,
  getCarsProps,
  updateCarProps,
  driveModeProps,
  IGetCars,
  IDriveMode,
} from '../types/raceAPI';
import { ICars, IEngine } from '../types/data';
import { PATH, CARS_PER_PAGE, BASE } from '../const/const';

export const getCars = async ({ page }: getCarsProps): Promise<IGetCars> => {
  const response = await fetch(`${BASE}${PATH.garage}?_limit=${CARS_PER_PAGE}&_page=${page}`);
  const quantity = Number(response.headers.get('x-total-count'));
  const cars: ICars | null = await response.json();

  return { cars, quantity };
};

export const createCar = async ({ data }: createCarProps): Promise<void> => {
  await fetch(`${BASE}${PATH.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const updateCar = async ({ data, idSelectedCar }: updateCarProps): Promise<void> => {
  await fetch(`${BASE}${PATH.garage}/${idSelectedCar}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteCar = async ({ id }: deleteCarProps): Promise<void> => {
  await fetch(`${BASE}${PATH.garage}/${id}`, {
    method: 'DELETE',
  });
};

export const controlCarEngine = async ({ id, status }: controlCarEngineProps): Promise<IEngine> => {
  const response = await fetch(`${BASE}${PATH.engine}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const result: IEngine = await response.json();
  return result;
};

export const driveMode = async ({ id }: driveModeProps): Promise<IDriveMode> => {
  const response = await fetch(`${BASE}${PATH.engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch((e) => e);

  return response.ok ? { success: true } : { success: false };
};
