import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import { ReactComponent as QRCase } from "../images/qrCase.svg";
import { toast } from "react-hot-toast";

export const QRPage = () => {
  //   const qrCode = useQuery({
  //     queryKey: ["qrCode"],
  //     queryFn: () => {
  //       axios.get(process.env.REACT_APP_API_URL);
  //     },
  //     refetchInterval: 1000 * 60,
  //     refetchIntervalInBackground: true,
  //     refetchOnWindowFocus: false,
  //   });

  return (
    <QRPageStyle>
      <div className="event-name">Glitch Korea Hackathon in Incheon</div>
      <button onClick={() => toast.success("hi")}>asdf</button>
      <QRCase className="qr-case" />
    </QRPageStyle>
  );
};

const QRPageStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  .event-name {
    padding-top: 2rem;
    font-size: 4rem;
  }
  .qr-case {
    position: absolute;
    left: 0;
    bottom: 5%;
    height: 80%;
  }
`;
