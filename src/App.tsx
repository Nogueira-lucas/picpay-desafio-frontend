import React from 'react';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      <Home />
      <GlobalStyle />
    </>
  );
}

export default App;
