import React from 'react';
import GloboIdClient from '@/services/globoid/globoid-service';

interface IAuth {
  globoId: string;
  token: string;
  email: string;
}

export const AuthContext = React.createContext<IAuth>({
  globoId: '',
  token: '',
  email: '',
});

// eslint-disable-next-line react/prop-types
export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [authData, setAuthData] = React.useState<IAuth | null>(null);

  React.useEffect(() => {
    const login = async () => {
      const client = new GloboIdClient(process.env.OIDC_KEY || '');
      await client.init();
      const logged = await client.isLogged();
      if (!logged) {
        await client.loginGloboID();
      } else {
        const tokenResponse = await client.getTokens();
        console.log('token: ', tokenResponse.access_token);

        const userInfo = await client.loadUserInfo();
        setAuthData({
          globoId: '6a84ad13-bed7-48d5-a208-9f7d2dc5b7fe',  //userInfo.globo_id,
          token: tokenResponse.access_token,
          email: userInfo.email,
        });
      }
    };
    login();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        globoId: authData != null ? authData.globoId : '',
        token: authData != null ? authData.token : '',
        email: authData != null ? authData.email : '',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};