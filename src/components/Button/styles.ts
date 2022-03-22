import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: var(--color-primary);
  height: 36px;
  border-radius: 5px;
  border: 0;
  padding: 0 16px;
  color: var(--color-white);
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#007DFE')};
  }
`;
