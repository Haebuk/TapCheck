import styled from "styled-components";
import dummy1 from "../images/dummy-1.jpeg";
import dummy2 from "../images/dummy-2.jpeg";
import dummy3 from "../images/dummy-3.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartEmptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const EventUnit = ({ data, index }) => {
  let dummyImage = [dummy1, dummy2, dummy3];
  return (
    <EventUnitStyle>
      <div className="title">
        {data.title}
        <p className="like">{index === 1 ? <FontAwesomeIcon className="colored" icon={faHeart} /> : <FontAwesomeIcon icon={faHeartEmptyHeart} />}</p>
      </div>
      <img alt="dummy" src={index === 0 ? dummy1 : index === 1 ? dummy2 : index === 2 ? dummy3 : ""}></img>
      <div className="button-wrapper">
        <button>VIEW DETAIL</button>
      </div>
    </EventUnitStyle>
  );
};

const EventUnitStyle = styled.div`
  width: 17rem;
  height: 25rem;
  background: linear-gradient(156.67deg, rgba(55, 25, 117, 0.8) 0.07%, rgba(104, 95, 122, 0.64) 99.07%);
  border-radius: 15px;
  margin: 0 2rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 1.5rem;
    padding: 1.5rem 0 1.5rem 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    position: relative;
  }
  .like {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);
    .colored {
      color: red !important;
    }
  }
  .button-wrapper {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
  }
  img {
    max-width: 14rem;
    border-radius: 15px;
  }
  button {
    background-color: transparent;
    border: 1px solid #b9b8bb;
    font-size: 1.2rem;
    border-radius: 1000px;
    width: 80%;
    height: 2.2rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  &:hover {
    box-shadow: white 0px 0px 0px 1px !important;
  }
`;
