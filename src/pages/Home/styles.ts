import styled from 'styled-components';
import searchIcon from '../../assets/search.svg';
import filterIcon from '../../assets/filter-icon.svg';

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  margin-top: 90px;
`;

export const Main = styled.main`
  width: 100%;
  padding: 0 48px;

  div.barControl {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 21px;
  }
`;

export const MainHeader = styled.div`
  height: 90px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
  /* padding: 0 48px; */

  h1 {
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 36px;
  }
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;

  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(4, 38, 82, 0.06);
  border-radius: 8px;
`;

export const TableContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 14px;

  div.search {
    display: flex;
    align-items: center;
  }

  input.search-bar {
    width: 220px;
    border: 0;
    height: 34px;
    padding-left: 10px;
    padding-right: 35px;
    font-size: 12px;
    border: 1px solid #cfdce5;
    border-radius: 5px;
    background: url(${searchIcon}) no-repeat 190px center, #fff;
    background-size: 20px;

    ::placeholder {
      color: #a3a3a3;
    }
  }

  button.searchButton {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    height: 28px;
    width: 66px;

    /* background: #E6ECF0; */
    background: url(${filterIcon}) no-repeat 5px center, #e6ecf0;
    border-radius: 6px;
    border: 0;
    height: 30px;
    padding: 5px 5px 5px 20px;

    color: #2d3540;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
`;

export const PaymentsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 15px;

  th {
    text-align: left;
    height: 40px;
    line-height: 40px;

    border-bottom: 2px solid #cfdce5;
  }

  th {
    padding: 0 14px;
  }

  th.centered {
    text-align: center;
  }

  th.actions {
    min-width: 200px;
  }

  tr:nth-child(even) {
    background-color: #f5f8fa;
  }

  tbody tr:hover {
    background: #f5f5f5;

    td.actions div {
      display: block;
    }
  }

  td {
    font-family: 'Lato';
    font-weight: 400;
    white-space: normal;
    text-align: left;
    height: 81px;
    padding: 5px 14px;
    font-size: 14px;
    line-height: 16px;
  }

  td.actions {
    text-align: right;

    > div {
      margin-right: 28px;
      display: none;

      button {
        border: 0;
        background: transparent;
      }

      > button {
        margin-right: 10px;
      }
    }
  }

  td div.userInfo {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  td div.dateInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  td div {
    span.bottomInfo {
      font-size: 12px;
      color: #69788c;
    }
  }
`;
