import React from "react";
import { Row, Col } from "react-bootstrap";
import { HiArrowUp } from "react-icons/hi";
import { Body, SubtitleMain } from "../global_styles/typography";
import styled from "styled-components";

export const StyledShipBox = styled.div`
  width: 275px;
  background-color: ${({ theme }) => theme.surface[1]};
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
`;

export const StyledBtnBackground = styled.div`
  background-color: ${({ theme }) => theme.surface[2]};
  color: ${({ theme }) => theme.text[1]};
  padding: 7px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s transform;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

export const StyledProfilePic = styled.span`
  background-color: ${({ theme }) => theme.surface[2]};
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const VoteCard = ({ users, votes }) => {
  return (
    <StyledShipBox>
      <Row className="mx-auto">
        <Col className="p-0">
          <Row className="mx-auto">
            <StyledProfilePic />
            <StyledProfilePic />
          </Row>
          <Row className="mx-auto mt-2">
            <Body>{users[0]}</Body>
          </Row>
          <Row className="mx-auto">
            <SubtitleMain>and</SubtitleMain>
          </Row>
          <Row className="mx-auto">
            <Body>{users[1]}</Body>
          </Row>
        </Col>
        <Col xs="auto" className="p-0">
          <StyledBtnBackground
            className={votes === 69 || votes === 5 ? "active" : ""}
          >
            <HiArrowUp style={{ display: "block" }} size={20} />
          </StyledBtnBackground>
          <Row className="mx-auto mt-1 justify-content-center">
            <SubtitleMain>{votes}</SubtitleMain>
          </Row>
        </Col>
      </Row>
    </StyledShipBox>
  );
};

export default VoteCard;
