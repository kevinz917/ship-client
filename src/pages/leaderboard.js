import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Header1, Header2, Header3, Body } from "../global_styles/typography";
import { MainInput } from "../global_styles/other";
import { fetchShips } from "../api/ship";
import VoteCard from "../components/VoteCard";

const Leaderboard = () => {
  const [searchText, setSearchText] = useState("");
  const [ships, setShips] = useState([]);
  const votes = [420, 69, 23, 10, 5];

  useEffect(() => {
    const onMount = async () => {
      // let fetchedShips = await fetchShips(searchText);
      // setShips(fetchedShips);
    };
    onMount();
  }, [searchText]);

  return (
    <Col className="p-0 fade-in">
      <Row className="mx-auto mt-5 justify-content-center">
        <Header1>Leaderboard ✌️</Header1>
      </Row>
      <Row className="mx-auto mt-3 justify-content-center">
        <MainInput
          placeholder="Search friends' names, etc..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </Row>
      <br />
      <Row className="mx-auto mt-4 justify-content-center">
        <div className="mx-auto" style={{ width: "700px" }}>
          <Row className="mx-auto justify-content-center">
            {votes.map((vote) => (
              <VoteCard users={["Max Yuan", "Kevin Zhang"]} votes={vote} />
            ))}
          </Row>
        </div>
      </Row>
    </Col>
  );
};

export default Leaderboard;
