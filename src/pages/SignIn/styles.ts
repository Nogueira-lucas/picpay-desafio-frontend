import styled from 'styled-components';
import signInBgImg from '../../assets/bg-signin.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 540px;

  div.logo {
    display: flex;
    margin-bottom: 16px;

    span {
      font-size: 24px;
      font-family: 'Montserrat';
      font-weight: 400;
      color: #2f82dd;

      &.detailLogo {
        color: #002d69;
        font-weight: 800;
      }
    }
  }

  h1 {
    margin-bottom: 23px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBgImg}) no-repeat center;
  background-size: 500px;
  background-color: #fff;
`;
