import React, { useState } from 'react';
import { IWinnersContext } from '../types/context';

export const WinnersContext = React.createContext<IWinnersContext | null>(null);

interface WinnersContextProviderProps {
  children: React.ReactNode;
}

export function WinnersContextProvider({ children }: WinnersContextProviderProps) {
  const [pageWinners, setPageWinners] = useState(0);
  const value = React.useMemo(() => ({ pageWinners, setPageWinners }), [pageWinners]);
  return <WinnersContext.Provider value={value}>{children}</WinnersContext.Provider>;
}
