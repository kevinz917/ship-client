import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { StyledHeader } from "../components/styledcomponents";
import { fetchShips } from "../util/api";
import Ship from "../components/ship";
import styled from "styled-components";

export const StyledTextArea = styled.textarea`
  width: 350px;
  max-width: 400px;
  border: none;
  color: ${({ theme }) => theme.text[0]};
  background-color: ${({ theme }) => theme.surface[1]};
  padding: 6px 8px;
  border-radius: 8px;

  &:active,
  &:focus {
    outline: none;
  }
`;

const Leaderboard = () => {
  const [searchText, setSearchText] = useState("");
  const [ships, setShips] = useState([]);
  const votes = [420, 69, 23, 10, 5];

  useEffect(() => {
    const onMount = async () => {
      let fetchedShips = await fetchShips(searchText);

      setShips(fetchedShips);
    };
    onMount();
  }, [searchText]);
  return (
    <Col className="p-0">
      <Row className="mx-auto mt-5 justify-content-center">
        <StyledHeader>Leaderboard</StyledHeader>
      </Row>
      <Row className="mx-auto mt-3 justify-content-center">
        <StyledTextArea
          rows={1}
          placeholder="Search friends' names, etc..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          style={{ resize: "none" }}
        />
      </Row>
      <Row className="mx-auto mt-4 justify-content-center">
        <div className="mx-auto" style={{ width: "500px" }}>
          <Row className="mx-auto justify-content-center">
            {votes.map((vote) => (
              <Ship users={["Max Yuan", "Kevin Zhang"]} votes={vote} />
            ))}
          </Row>
        </div>
      </Row>
    </Col>
  );
};

export default Leaderboard;
