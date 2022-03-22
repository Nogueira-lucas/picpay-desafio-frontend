import styled, { css } from 'styled-components';

interface DropdownMenuProps {
  isVisible?: boolean;
}

export const Container = styled.header`
  position: fixed;
  top: 0;

  display: flex;
  width: 100%;
  height: 90px;
  padding: 30px;
  background: var(--color-header);

  justify-content: space-between;
  align-items: center;
  z-index: 1;

  div.logo {
    display: flex;
    color: var(--color-white);

    span {
      font-size: 24px;
      font-family: 'Montserrat';
      font-weight: 400;

      &.detail {
        font-weight: 800;
      }
    }
  }

  button.dropAccountInfo {
    position: relative;
    display: flex;
    height: 56px;
    width: 200px;
    border-radius: 30px;
    align-items: center;
    justify-content: space-between;
    margin-left: auto;
    background: var(--color-header);
    border: 0;
    color: var(--color-white);

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 4px;
    }

    svg.open-drop {
      width: 25px;
      height: 25px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
`;

export const DropdownMenu = styled.div`
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
`;

export const DropdownMenuContent = styled.div<DropdownMenuProps>`
  position: absolute;
  right: 0px;
  top: calc(100% + 10px);
  width: 256px;
  padding: 0px;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 40%) 4px 4px 4px 2px;
  transition: opacity 0.2s ease 0s, visibility 0.2s ease 0s;
  opacity: 1;
  z-index: 9;

  ${props =>
    props.isVisible
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}

  a {
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 16px;
    color: var(--color-gray);
    padding: 12px 24px;
    transition: background 0.2s ease 0s;
    cursor: pointer;
    background: transparent;
    border: none;
    width: 100%;
    text-decoration: none;
    border-radius: 5px;

    svg.drop {
      width: 16;
      height: 16;
      margin-right: 0;
    }

    span {
      margin-left: 24px;
    }

    &:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 19px;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0px 8px 8px;
    border-color: transparent transparent var(--color-white);
  }
`;
