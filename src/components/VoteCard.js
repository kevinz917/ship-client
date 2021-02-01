import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { HiArrowUp } from "react-icons/hi";
import { Body, SubtitleMain } from "../global_styles/typography";
import { toggleVote } from "../api/ship";
import { VotingBtn } from "../global_styles/button";
import { StyledProfilePic, StyledShipBox } from "../global_styles/other";
import { VscLoading } from "react-icons/vsc";

const VoteCard = ({ ship, userVotes, rerender }) => {
  const [isVoting, setIsVoting] = useState(false);
  const [votes, setVotes] = useState(null); // total reactions
  const [voteToggle, setVoteToggle] = useState(false); // whether user has voted

  useEffect(() => {
    setVotes(ship.votes);
    if (userVotes) {
      if (userVotes.includes(ship._id)) {
        setVoteToggle(true);
      }
    }
  }, [userVotes]);

  // Main toggle vote func
  const toggle = async () => {
    setIsVoting(true);
    if (voteToggle === true) {
      setVotes(votes - 1);
      setVoteToggle(false);
      await toggleVote(ship._id, -1);
    } else {
      setVotes(votes + 1);
      setVoteToggle(true);
      await toggleVote(ship._id, 1);
    }
    setIsVoting(false);
    rerender();
  };

  return (
    <StyledShipBox>
      <Row className="mx-auto">
        <Col className="p-0">
          <Row className="mx-auto">
            <StyledProfilePic />
            <StyledProfilePic />
          </Row>
          <Row className="mx-auto mt-2">
            <Body>{ship.userNames[0]}</Body>
          </Row>
          <Row className="mx-auto">
            <SubtitleMain>and</SubtitleMain>
          </Row>
          <Row className="mx-auto">
            <Body>{ship.userNames[1]}</Body>
          </Row>
        </Col>
        <Col xs="auto" className="p-0">
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
          <Row className="mx-auto mt-1 justify-content-center">
            <SubtitleMain>{votes}</SubtitleMain>
          </Row>
        </Col>
      </Row>
    </StyledShipBox>
  );
};

export default VoteCard;
