import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 38px;

  main p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;

    letter-spacing: 0.15px;

    color: #000000;
  }

  footer {
    display: flex;
    justify-content: space-between;

    button {
      align-self: flex-end;
      display: flex;
      width: 150px;
      height: 36px;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      border: 0;
      border-radius: 4px;
    }

    button.confirmNo {
      color: #333333;
      background: #f5f5f5;
      margin-right: 30px;
    }

    button.confirmYes {
      color: #fff;
      background: #007dfe;
    }
  }
`;
