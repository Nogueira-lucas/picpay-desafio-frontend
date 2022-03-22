import styled, { css } from 'styled-components';

import { Tooltip } from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--color-white);
  border-radius: 5px;
  padding: 15px;
  width: 100%;
  height: 56px;

  border: 2px solid var(--color-border);
  color: var(--color-gray);

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--color-warning);
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #007dfe;
      color: #007dfe;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--color-primary);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000000;

    &::placeholder {
      color: var(--color-placeholder);
    }
  }

  > svg {
    margin-right: 16px;
  }

  button.showPassword {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    color: var(--color-gray);
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 0px;

  svg {
    margin-right: 0;
  }

  span {
    background: var(--color-warning);
    color: var(--color-white);

    &::before {
      border-color: var(--color-warning) transparent;
    }
  }
`;
