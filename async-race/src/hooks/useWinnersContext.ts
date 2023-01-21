import { useContext } from 'react';
import { WinnersContext } from '../context/WinnersContext';

export default function useWinnersContext() {
  const winnersContext = useContext(WinnersContext);

  if (!winnersContext) throw new Error('You need to use garageContext context inside provider');

  return winnersContext;
}
