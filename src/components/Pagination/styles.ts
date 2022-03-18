import styled, { css } from "styled-components";

interface PaginationProps {
  isSelected?: boolean;
}

export const Container = styled.div`
  display: flex;
  padding: 12px 0;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  font-size: 15px;

  div.pageLimitToShow {
    display: flex;
    align-items: center;
    margin-right: 20px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #69788C;

    span {
      margin-right: 5px;
    }

    select {
      margin-right: 5px;
    }

    div.pageLimitToShowControl {
      width: 100px;
      margin-right: 5px;
    }
  }
`;

export const PagesContainer = styled.div`
  display: flex;

  button.controlNavPage {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: #69788C;
    margin-right: 10px;
    border: 0;
    background: transparent;
  }
`;

export const Page = styled.button<PaginationProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #69788C;
  font-size: 12px;
  margin-right: 10px;
  border: 0;
  background: transparent;
  font-size: 15px;

  ${(props) =>
    props.isSelected &&
    css`
      background: #007DFE;
      border-radius: 6px;
      color: #fff;
      cursor: default;
    `}
`;
