import { createContext, Dispatch, SetStateAction } from 'react';

interface IAppContext {
  loading: boolean;
  contacting: boolean;
  hasDarkLogo: boolean;
  setContacting: Dispatch<SetStateAction<boolean>>;
  setHasDarkLogo: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
