import { useContext } from 'react';
import { GarageContext } from '../context/GarageContext';

export default function useGarageContext() {
  const garageContext = useContext(GarageContext);

  if (!garageContext) throw new Error('You need to use garageContext context inside provider');

  return garageContext;
}
