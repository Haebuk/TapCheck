import { LandingSectionFirst } from "../components/LandingSectionFirst";
import { LandingSectionSecond } from "../components/LandingSectionSecond";
import { LandingSectionThird } from "../components/LandingSectionThird";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export const LandingPage = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/event/list`).then((res) => setEventList(res.data.events));
  }, []);

  return (
    <LandingPageStyle>
      <LandingSectionFirst />
      <LandingSectionSecond eventList={eventList} />
      <LandingSectionThird />
    </LandingPageStyle>
  );
};

const LandingPageStyle = styled.div`
  /* height: 3rem; */
`;
