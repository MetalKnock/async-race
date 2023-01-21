import React, { useState } from 'react';
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

  const value = React.useMemo(
    () => ({
      pageWinners,
      winners,
      winnersQuantity,
      setPageWinners,
      setWinners,
      setWinnersQuantity,
    }),
    [pageWinners, winners, winnersQuantity],
  );
  return <WinnersContext.Provider value={value}>{children}</WinnersContext.Provider>;
}
