import styled from "styled-components";

export const Container = styled.header`
  position: fixed;
  top: 0;

  display: flex;
  width: 100%;
  height: 90px;
  padding: 30px;
  background: #002d69;

  justify-content: space-between;
  align-items: center;

  div.logo {
    display: flex;
    color: #ffffff;

    span {
      font-size: 24px;
      font-family: "Montserrat";
      font-weight: 400;

      &.detail {
        font-weight: 800;
      }
    }
  }

  div.profile {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      
    }
  }
`;
