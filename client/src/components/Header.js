import styled from "styled-components";
import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <HeaderStyle>
      <ConnectButton className="connect-button" />
      <div className="button-wrapper">
        <button>HOME</button>
        <button>ABOUT US</button>
        <button>SERVICE</button>
      </div>
      <ConnectButton className="connect-button" />
      {/* <ConnectButton className="connect-button" chainStatus="none" /> */}
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  position: absolute;
  top: 0;
  height: 7rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  padding: 0 3rem 0 3rem;
  .button-wrapper {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .connect-button {
    div * {
      font-size: 10rem !important;
    }
  }
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    margin: 0 0 0 1rem;
  }
`;
