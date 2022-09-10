import { createContext, useContext, useReducer } from 'react';
import { TState } from '../reducers/provider';

interface StoreProviderProps {
  children: any;
  initialState: TState;
  reducers: any;
}

const Store = createContext(null);
Store.displayName = 'Store';

export const useStore = () => useContext(Store);

export const StoreProvider = ({
  children,
  initialState,
  reducers
}: StoreProviderProps) => {
  const [globalState, dispatch] = useReducer(reducers, initialState);

  return (
    <Store.Provider value={[globalState, dispatch]}>
      {children}
    </Store.Provider>
  );
}
