import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { HiArrowUp } from "react-icons/hi";
import { Body, SubtitleMain } from "../global_styles/typography";
import { toggleVote } from "../api/ship";
import { VotingBtn } from "../global_styles/button";
import { StyledProfilePic, StyledShipBox } from "../global_styles/other";
import { VscLoading } from "react-icons/vsc";

const VoteCard = ({
  ship,
  userVotes,
  handleVote,
  updateShip,
  indx,
  disabled,
  userEmail,
}) => {
  const [isVoting, setIsVoting] = useState(false);

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

  return (
    <StyledShipBox mine={ship.emails.includes(userEmail)}>
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
          {disabled && (
            <div>
              <hr />
              <Row className="mx-auto">
                <strong>Contacts</strong>
              </Row>
              <Row className="mx-auto">{ship.emails[0]}</Row>
              <Row className="mx-auto">{ship.emails[1]}</Row>
            </div>
          )}
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
              {ship.votes + 10 * ((ship.shippers ? ship.shippers : 1) - 1)}
            </SubtitleMain>
          </Row>
        </Col>
      </Row>
    </StyledShipBox>
  );
};

export default VoteCard;
