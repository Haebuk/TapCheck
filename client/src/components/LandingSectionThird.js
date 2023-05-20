import styled from "styled-components";
import { ReactComponent as Dot } from "../images/dot.svg";
import { EventUnit } from "./EventUnit";
import axios from "axios";
import { useEffect, useState } from "react";
import beforeText from "../images/before-text.png";
import before from "../images/before.png";
import after from "../images/after.png";
import afterText from "../images/after-text.png";
import section3text from "../images/section3text.png";
import section3image from "../images/section3image.png";
import section4text1 from "../images/section4text1.png";
import section4text2 from "../images/section4text2.png";
import buildingBottom from "../images/building-bottom.png";
import planet from "../images/planet.png";
import ellipse1 from "../images/ellipse1.png";
import ellipse2 from "../images/ellipse2.png";

export const LandingSectionThird = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/event/list`).then((res) => setEventList(res.data.events));
  }, []);

  return (
    <SectionThirdStyle>
      <div className="blur-upper"></div>
      <div className="content">
        <div className="section-1">
          <img className="section-unit section1-text" src={beforeText} alt="section1"></img>
          <img className="section-unit section1-image" src={before} alt="section1"></img>
        </div>
        <div className="section-2">
          <img className="section-unit section2-image" src={after} alt="section2"></img>
          <img className="section-unit section2-text" src={afterText} alt="section2"></img>
        </div>
        <div className="section-3">
          <img className="section-unit section3-text" src={section3text} alt="section3"></img>
          <img className="section-unit section3-image" src={section3image} alt="section3"></img>
        </div>
        <div className="section-4">
          <div className="wrapper4-1">
            <img className="section-unit section4text1" src={section4text1} alt="section4"></img>
          </div>
          <img className="section-unit section4text2" src={section4text2} alt="section4"></img>
        </div>
      </div>
      <img alt="ellipse1" src={ellipse1} className="ellipse1"></img>
      <img alt="ellipse2" src={ellipse2} className="ellipse2"></img>
      <img alt="planet" className="planet" src={planet}></img>
      <img alt="building-bottom" className="building-bottom" src={buildingBottom}></img>
    </SectionThirdStyle>
  );
};

const SectionThirdStyle = styled.div`
  /* height: 100vh; */
  position: relative;
  overflow: hidden;
  .blur-upper {
    z-index: 2;
    position: absolute;
    top: 0rem;
    height: 15rem;
    width: 100vw;
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  .content {
    /* position: absolute; */
    padding: 2rem 0 2rem 0;
    width: 100%;
    z-index: 5;
    top: 10%;
    /* transform: translateY(-50%); */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .section-unit {
    z-index: 3;
  }
  .section-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7rem;
    max-width: 1400px;
    .section1-text {
      width: 50%;
    }
    .section1-image {
      width: 40%;
    }
  }
  .section-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7rem;
    max-width: 1400px;
    .section2-text {
      width: 40%;
    }
    .section2-image {
      width: 40%;
    }
  }
  .section-3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 7rem; */
    max-width: 1400px;
    .section3-text {
      width: 30%;
      margin: 0 0 30rem 5rem;
    }
    .section3-image {
      width: 70%;
    }
  }
  .section-4 {
    .wrapper4-1 {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
    .section4text1 {
      margin: -8rem 4rem 20rem 0;
    }
    .section4text2 {
      width: 90%;
      margin-bottom: 10rem;
    }
  }
  .ellipse1 {
    position: absolute;
    top: 0rem;
    left: 0;
    z-index: 5;
    opacity: 0.6;
  }
  .ellipse2 {
    position: absolute;
    bottom: 25rem;
    left: 0;
    z-index: 5;
  }
  .planet {
    position: absolute;
    top: 20rem;
    right: -20rem;
    width: 100%;
    opacity: 0.1;
  }
  .building-bottom {
    position: absolute;
    width: 200%;
    bottom: -12rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.2;
  }
`;
