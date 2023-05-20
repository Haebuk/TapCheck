import styled from "styled-components";
import fog from "../images/fog.jpeg";
import { ReactComponent as Dot } from "../images/dot.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import { EventUnit } from "./EventUnit";

export const LandingSectionSecond = ({ eventList }) => {
  return (
    <SectionSecondStyle>
      <div className="blur-upper"></div>
      <div className="content">
        <div className="text-wrapper">
          <Dot />
          <p>PARTICIPATE IN THE EVENT</p>
        </div>
        <div className="event-wrapper">
          {eventList.map((map, idx) => (
            <EventUnit key={idx} data={map} index={idx} />
          ))}
        </div>
      </div>
      <img className="fog" alt="fog" src={fog}></img>
      <div className="blur-lower"></div>
    </SectionSecondStyle>
  );
};

const SectionSecondStyle = styled.div`
  height: 100vh;
  position: relative;
  /* padding: 2rem 0 2rem 0; */
  .fog {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 100vh;
    opacity: 0.3;
    /* z-index: 1; */
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
    height: 20rem;
    width: 100vw;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .content {
    position: absolute;
    padding: 0rem 0 2rem 0;
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
