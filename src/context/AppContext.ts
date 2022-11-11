import { createContext, Dispatch, SetStateAction } from 'react';

interface IAppContext {
  loading: boolean;
  hasDarkLogo: boolean;
  setHasDarkLogo: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
