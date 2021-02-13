import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { HiArrowUp } from "react-icons/hi";
import {
  Body,
  SubtitleMain,
  SmallSubtitle,
  Header4,
} from "../global_styles/typography";
import { toggleVote } from "../api/ship";
import { VotingBtn } from "../global_styles/button";
import { StyledShipBox } from "../global_styles/other";
import { VscLoading } from "react-icons/vsc";
import CustomToggle from "./customToggle";
import { fetchUserAnswers } from "../api/user";

const VoteCard = ({
  ship,
  userVotes,
  handleVote,
  updateShip,
  indx,
  disabled,
  userEmail,
  userName,
  deleteShip,
}) => {
  const [isVoting, setIsVoting] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const onMount = async () => {
      if (disabled) {
        // Fetch ship partner's answers
        let res = await fetchUserAnswers(userEmail, ship._id);
        setAnswers(res);
      }
    };
    onMount();
  }, []);

  let voteToggle = null;
  let toggle = null;

  if (!disabled) {
    voteToggle = userVotes.includes(ship._id);

    // Main toggle vote func
    toggle = async () => {
      setIsVoting(true);
      handleVote(ship._id);
      updateShip(indx, voteToggle === true ? -1 : +1);
      if (voteToggle === true) {
        await toggleVote(ship._id, -1);
      } else {
        await toggleVote(ship._id, 1);
      }
      setIsVoting(false);
    };
  }

  const questions = [
    "How should people contact you?",
    "Favorite New Haven Restaurant?",
    "Favorite quarantine hobby?",
    "First thing you'll do when quarantine ends?",
    "Ask me about ...",
  ];

  const vote_cnt = ship.votes + 10 * ((ship.shippers ? ship.shippers : 1) - 1);

  return (
    <StyledShipBox mine={ship.emails.includes(userEmail)} disabled={disabled}>
      <Row className="mx-auto">
        <Col className="p-0">
          {disabled ? (
            <Row className="mx-auto mt-2">
              <Header4
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "190px",
                }}
              >
                {ship.userNames[1 - ship.userNames.indexOf(userName)]}
              </Header4>
            </Row>
          ) : (
            <>
              <Row className="mx-auto mt-2">
                <Header4
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "190px",
                  }}
                >
                  {ship.userNames[0]}
                </Header4>
              </Row>
              <Row className="mx-auto">
                <SmallSubtitle>and</SmallSubtitle>
              </Row>
              <Row className="mx-auto">
                <Header4
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "190px",
                  }}
                >
                  {ship.userNames[1]}
                </Header4>
              </Row>
            </>
          )}
          {disabled && answers.length > 0 ? (
            <div>
              <hr />
              {questions.map((question, idx) =>
                answers[idx] && answers[idx].length > 0 ? (
                  <div>
                    <SmallSubtitle>{question}</SmallSubtitle>
                    <Body>{answers[idx]}</Body>
                    <div style={{ height: "8px" }} />
                  </div>
                ) : // <div />
                null
              )}
            </div>
          ) : null}
        </Col>
        <Col xs="auto" className="p-0">
          {!disabled && (
            <VotingBtn clicked={voteToggle} onClick={toggle}>
              {isVoting ? (
                <div
                  style={{ width: "20px", height: "20px" }}
                  className="d-flex flex-row align-items-center justify-content-center"
                >
                  <VscLoading
                    size={20}
                    className="rotate-fast"
                    style={{ color: voteToggle ? "white" : "black" }}
                  />
                </div>
              ) : (
                <HiArrowUp style={{ display: "block" }} size={20} />
              )}
            </VotingBtn>
          )}
          <Row className="mx-auto mt-1 justify-content-center">
            <SubtitleMain>
              {vote_cnt} {disabled && (vote_cnt === 1 ? "vote" : "votes")}
            </SubtitleMain>
          </Row>
          {ship.emails.includes(userEmail) ? (
            <Row className="mx-auto mt-1 justify-content-center">
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => deleteShip(ship._id, indx)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          ) : null}
        </Col>
      </Row>
    </StyledShipBox>
  );
};

export default VoteCard;
