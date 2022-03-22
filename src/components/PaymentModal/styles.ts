import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 30px;
  display: flex;
  flex-direction: column;

  h3 {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: var(--color-text);
  }

  div {
    margin-top: 0px;
  }

  div.control {
    display: flex;
  }

  div.row {
    display: flex;
    margin-bottom: 38px;
    align-items: center;
  }

  div.row div {
    :not(:last-child) {
      margin-right: 40px;
    }
  }

  div.label {
    margin-right: 30px;
    min-width: 115px;

    font-weight: bold;
  }

  div.footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

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

  button.cancel {
    color: var(--color-text);
    background: var(--color-background);
    margin-right: 30px;
  }

  button.confirm {
    color: var(--color-white);
    background: var(--color-primary);
  }

  .logoErrorInput {
    margin-left: 5px;
  }
`;
