import styled from "styled-components";
import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useRef } from "react";

export const Header = () => {
  return (
    <HeaderStyle>
      <div className="button-wrapper">
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          HOME
        </button>
        <button
          onClick={() => {
            window.scrollTo(0, 900);
          }}
        >
          SERVICE
        </button>
        <button
          onClick={() => {
            window.scrollTo(0, 1750);
          }}
        >
          ABOUT US
        </button>
      </div>
      <ConnectButton className="connect-button" />
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  height: 7rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  padding: 0 3rem 0 3rem;
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* filter: blur(3px); */
  .button-wrapper {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .connect-button {
  }
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    margin: 0 0 0 1rem;
  }
`;
