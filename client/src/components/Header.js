import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderStyle>
      <div className="button-wrapper">
        <button>HOME</button>
        <button>ABOUT US</button>
        <button>SERVICE</button>
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  position: absolute;
  top: 0;
  height: 7rem;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  z-index: 100;
  .button-wrapper {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 0 3rem;
  }
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    margin: 0 0 0 1rem;
  }
`;
