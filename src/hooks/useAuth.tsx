'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setIsAuth] = useState(false);

  const value = useMemo(
    () => ({
      isAuth,
      setIsAuth,
    }),
    [isAuth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
