import React, { useState } from 'react';
import { INIT_QUERY_SORT } from '../const/const';
import { IWinnersContext } from '../types/context';
import { IWinners } from '../types/data';

export const WinnersContext = React.createContext<IWinnersContext | null>(null);

interface WinnersContextProviderProps {
  children: React.ReactNode;
}

export function WinnersContextProvider({ children }: WinnersContextProviderProps) {
  const [pageWinners, setPageWinners] = useState(1);
  const [winners, setWinners] = useState<IWinners>([]);
  const [winnersQuantity, setWinnersQuantity] = useState(0);
  const [querySort, setQuerySort] = useState(INIT_QUERY_SORT);

  const value = React.useMemo(
    () => ({
      pageWinners,
      winners,
      winnersQuantity,
      querySort,
      setPageWinners,
      setWinners,
      setWinnersQuantity,
      setQuerySort,
    }),
    [pageWinners, winners, winnersQuantity, querySort],
  );
  return <WinnersContext.Provider value={value}>{children}</WinnersContext.Provider>;
}
