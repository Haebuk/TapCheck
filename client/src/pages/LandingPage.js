import { LandingSectionFirst } from "../components/LandingSectionFirst";
import { LandingSectionSecond } from "../components/LandingSectionSecond";
import { LandingSectionThird } from "../components/LandingSectionThird";
import styled from "styled-components";

export const LandingPage = () => {
  return (
    <LandingPageStyle>
      <LandingSectionFirst />
      <LandingSectionSecond />
      <LandingSectionThird />
    </LandingPageStyle>
  );
};

const LandingPageStyle = styled.div`
  /* height: 3rem; */
`;
