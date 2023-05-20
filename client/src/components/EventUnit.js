import styled from "styled-components";

export const EventUnit = () => {
  return (
    <EventUnitStyle>
      <p></p>
    </EventUnitStyle>
  );
};

const EventUnitStyle = styled.div`
  width: 18rem;
  height: 25rem;
  background: linear-gradient(156.67deg, rgba(55, 25, 117, 0.8) 0.07%, rgba(104, 95, 122, 0.64) 99.07%);
  border-radius: 15px;
  margin: 0 2rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    border: 1px solid white;
  }
`;
