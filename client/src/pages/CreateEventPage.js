import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import fog from "../images/fog.jpeg";

export const CreateEventPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [location, setLocation] = useState("");
  console.log(new Date(startDate).toISOString());

  const createEvent = () => {
    // axios.
  };
  return (
    <CreateEventStyle>
      <div className="content-wrapper">
        <div className="image-wrapper"></div>
        <div className="info-wrapper">
          <input type="text" className="event-name" placeholder="Event name"></input>
          <div className="date-picker-wrapper">
            <p>Date :</p>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" />
          </div>
          <div className="location-wrapper">
            <p>Location :</p>
            <input className="event-location"></input>
          </div>
          <div className="description-wrapper">
            <p>Description :</p>
            <textarea></textarea>
          </div>
          <div className="button-wrapper">
            <button onClick={createEvent}>Submit</button>
          </div>
        </div>
      </div>
    </CreateEventStyle>
  );
};

const CreateEventStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  .fog {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 100vh;
    opacity: 0.15;
    /* z-index: 1; */
  }
  .content-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 60vh;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    display: flex;

    .image-wrapper {
      aspect-ratio: 1/1;
    }
    .info-wrapper {
      flex: 1 0 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem 1rem 2rem 1rem;
    }

    .event-name {
      background-color: transparent;
      border: none;
      width: 100%;
      /* place */
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .event-name::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }

    .event-location {
      background-color: rgba(0, 0, 0, 0.2);
      font-size: 1.2rem;
      border: none;
      border-radius: 5px;
      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    }
    ㅇ input {
      outline: none;
    }
  }
  .date-picker-wrapper {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    p {
      margin-right: 1rem;
      white-space: nowrap;
    }
  }
  .location-wrapper {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    width: 100%;
    p {
      margin-right: 1rem;
      white-space: nowrap;
    }
    input {
      flex: 1 0 0;
    }
  }
  .description-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      margin-right: 1rem;
      white-space: nowrap;
      font-size: 1.5rem;
      margin-bottom: 0.3rem;
    }
    textarea {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      outline: none;
      resize: none;
      font-size: 1.2rem;
      padding: 0.5rem 0.5rem 0.5rem 0.5rem;
      height: 15rem;
    }
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0 0 0;

    button {
      cursor: pointer;
      font-size: 1.5rem;
      padding: 0.5rem;
      width: 15rem;
      border-radius: 1000px;
      border: none;
      background: linear-gradient(108.83deg, #a64371 13.51%, #1888ef 149.47%);
    }
  }
  .react-datepicker__input-container {
    text-align: start;
    input {
      /* width: 100%; */
      background-color: rgba(0, 0, 0, 0.2);
      font-size: 1.2rem;
      border: none;
      border-radius: 5px;
      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
      cursor: pointer;
      text-align: center;
    }
  }
  .react-datepicker__time-list-item {
    color: black;
  }
`;
