import styled from "styled-components";
import fog from "../images/fog.jpeg";

export const LandingSectionSecond = () => {
  return (
    <SectionSecondStyle>
      <div className="blur-upper"></div>
      <img className="fog" alt="fog" src={fog}></img>
      <div className="blur-lower"></div>
    </SectionSecondStyle>
  );
};

const SectionSecondStyle = styled.div`
  /* height: 100rem; */
  position: relative;
  .fog {
    width: 100%;
    opacity: 30%;
  }
  .blur-upper {
    z-index: 2;
    position: absolute;
    top: 0rem;
    height: 4rem;
    width: 100vw;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
  }
  .blur-lower {
    z-index: 2;
    position: absolute;
    bottom: 0rem;
    height: 4rem;
    width: 100vw;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  }
`;
