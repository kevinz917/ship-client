import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { HiArrowUp } from "react-icons/hi";
import { Body, SubtitleMain, SmallSubtitle } from "../global_styles/typography";
import { toggleVote, removeShip } from "../api/ship";
import { VotingBtn } from "../global_styles/button";
import { StyledProfilePic, StyledShipBox } from "../global_styles/other";
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
    "Favorite New Haven Restaurant?",
    "Fav study spot?",
    "Is cereal a soup?",
  ];

  return (
    <StyledShipBox mine={ship.emails.includes(userEmail)} disabled={disabled}>
      <Row className="mx-auto">
        <Col className="p-0">
          <Row className="mx-auto mt-2">
            <Body>{ship.userNames[0]}</Body>
          </Row>
          <Row className="mx-auto">
            <SubtitleMain>and</SubtitleMain>
          </Row>
          <Row className="mx-auto">
            <Body>{ship.userNames[1]}</Body>
          </Row>
          {disabled && answers.length > 0 ? (
            <div>
              <hr />
              {questions.map((question, idx) => (
                <div>
                  <SmallSubtitle>{question}</SmallSubtitle>
                  <Body>{answers[idx]}</Body>
                  <div style={{ height: "8px" }} />
                </div>
              ))}
              <hr />
              <Row className="mx-auto">{ship.emails[0]}</Row>
              <Row className="mx-auto">{ship.emails[1]}</Row>
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
              {ship.votes + 10 * ((ship.shippers ? ship.shippers : 1) - 1)}{" "}
              {disabled && "votes"}
            </SubtitleMain>
          </Row>
          {ship.emails.includes(userEmail) && !disabled ? (
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
