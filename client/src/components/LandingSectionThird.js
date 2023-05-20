import styled from "styled-components";
import { ReactComponent as Dot } from "../images/dot.svg";
import { EventUnit } from "./EventUnit";

export const LandingSectionThird = () => {
  return (
    <SectionThirdStyle>
      <div className="blur-upper"></div>
      <div className="content">
        <div className="text-wrapper">
          <Dot />
          <p>PARTICIPATE IN THE EVENT</p>
        </div>
        <div className="event-wrapper">
          <EventUnit />
          <EventUnit />
          <EventUnit />
        </div>
      </div>
    </SectionThirdStyle>
  );
};

const SectionThirdStyle = styled.div`
  height: 100vh;
  position: relative;
  .blur-upper {
    z-index: 2;
    position: absolute;
    top: 0rem;
    height: 15rem;
    width: 100vw;
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  .content {
    position: absolute;
    padding: 2rem 0 2rem 0;
    width: 100%;
    z-index: 5;
    top: 10%;
    /* transform: translateY(-50%); */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .text-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin: 0 0 3rem 0;
    svg {
      margin: 0 0 1rem 0;
    }
    p {
      line-height: 100%;
      font-size: 4rem;
    }
  }
  .event-wrapper {
    display: flex;
  }
`;
