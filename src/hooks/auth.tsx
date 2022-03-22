import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

interface IAccount {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  account: IAccount;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  account: IAccount;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateAccount(account: IAccount): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const storageKey = '@payfriends:account';

  const [data, setData] = useState<AuthState>(() => {
    const account = localStorage.getItem(storageKey);

    if (account) {
      return { account: JSON.parse(account) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.get('/account', {
      params: {
        email,
        password,
      },
    });

    const account = response.data[0];

    if (!account) {
      throw new Error('Not found');
    }

    localStorage.setItem(storageKey, JSON.stringify(account));

    setData({ account });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(storageKey);

    setData({} as AuthState);
  }, []);

  const updateAccount = useCallback(
    (account: IAccount) => {
      localStorage.setItem(storageKey, JSON.stringify(account));
      setData({
        account,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{
        account: data.account,
        signIn,
        signOut,
        updateAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
