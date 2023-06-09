import styled from "styled-components";
import building from "../images/building.png";
import { ReactComponent as Logo } from "../images/logo.svg";
import logo from "../images/TAPCHECK-LOGO.png";
import moon from "../images/moon.png";

export const LandingSectionFirst = () => {
  return (
    <SectionFirstStyle>
      <img className="moon-image" alt="moon" src={moon}></img>
      <img className="building-image" alt="building" src={building}></img>
      <img className="logo" alt="logo" src={logo}></img>
      <div className="blur"></div>
    </SectionFirstStyle>
  );
};

const SectionFirstStyle = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  .moon-image {
    position: absolute;
    left: 10%;
    transform: translateX(-50%);
    width: 60%;
    opacity: 0.5;
    background-blend-mode: saturation;
    filter: blur(3px);
    z-index: 1;
  }
  .building-image {
    width: 2000px;
    position: absolute;
    bottom: -7rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.6;
    z-index: 1;
  }
  .logo {
    position: absolute;
    left: 50%;
    bottom: 10rem;
    transform: translateX(-50%);
    z-index: 3;
    width: 65vw;
  }
  .blur {
    z-index: 2;
    position: absolute;
    bottom: 0rem;
    height: 4rem;
    width: 100vw;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  }
`;
