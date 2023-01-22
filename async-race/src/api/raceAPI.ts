import {
  controlCarEngineProps,
  createCarProps,
  deleteCarProps,
  getCarsProps,
  updateCarProps,
  driveModeProps,
  createWinnerProps,
  deleteWinnerProps,
  getWinnersProps,
  updateWinnerProps,
  getWinnerProps,
  getCarProps,
} from '../types/raceAPI';
import { ICar, ICars, IEngine, IWinner, IWinners } from '../types/data';
import { PATH, CARS_PER_PAGE, BASE } from '../const/const';

export const getCars = async ({ pageGarage }: getCarsProps) => {
  try {
    const response = await fetch(
      `${BASE}${PATH.garage}?_limit=${CARS_PER_PAGE}&_page=${pageGarage}`,
    );
    const quantity = Number(response.headers.get('x-total-count'));
    const cars: ICars | null = await response.json();
    return { cars, quantity };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCar = async ({ id }: getCarProps) => {
  try {
    const response = await fetch(`${BASE}${PATH.garage}/${id}`);
    const car: ICar | null = await response.json();
    return { car };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createCar = async ({ data }: createCarProps) => {
  try {
    await fetch(`${BASE}${PATH.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateCar = async ({ data, idSelectedCar }: updateCarProps) => {
  try {
    await fetch(`${BASE}${PATH.garage}/${idSelectedCar}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteCar = async ({ id }: deleteCarProps) => {
  try {
    await fetch(`${BASE}${PATH.garage}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};

export const controlCarEngine = async ({ id, status }: controlCarEngineProps) => {
  try {
    const response = await fetch(`${BASE}${PATH.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const result: IEngine = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const driveMode = async ({ id, signal }: driveModeProps) => {
  try {
    const response = await fetch(`${BASE}${PATH.engine}?id=${id}&status=drive`, {
      method: 'PATCH',
      signal,
    }).catch((e) => e);

    return response.ok ? { success: true } : { success: false };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getWinners = async (props: getWinnersProps) => {
  try {
    let responseString = `${BASE}${PATH.winners}`;
    if (Object.keys(props).length > 0) {
      responseString += `?_${Object.entries(props)
        .map((val) => val.join('='))
        .join('&_')}`;
    }
    const response = await fetch(responseString);
    let quantity = null;
    if (Object.keys(props).length > 0) {
      quantity = Number(response.headers.get('x-total-count'));
    }
    const winners: IWinners | null = await response.json();
    return { winners, quantity };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getWinner = async ({ id }: getWinnerProps) => {
  try {
    const response = await fetch(`${BASE}${PATH.winners}/${id}`);
    const winner: IWinner | null = await response.json();

    return { winner };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createWinner = async ({ data }: createWinnerProps) => {
  try {
    await fetch(`${BASE}${PATH.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteWinner = async ({ id }: deleteWinnerProps) => {
  try {
    await fetch(`${BASE}${PATH.winners}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateWinner = async ({ data, id }: updateWinnerProps) => {
  try {
    await fetch(`${BASE}${PATH.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};
