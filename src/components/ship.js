import React from "react";
import { Row, Col } from "react-bootstrap";
import { HiArrowUp } from "react-icons/hi";
import styled from "styled-components";

export const StyledShipBox = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.surface[1]};
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
`;

export const StyledPrimaryText = styled.span`
  color: ${({ theme }) => theme.text[0]};
  font-weight: 500;
`;

export const StyledSecondaryText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text[1]};
`;

export const StyledBtnBackground = styled.div`
  background-color: ${({ theme }) => theme.surface[2]};
  color: ${({ theme }) => theme.text[1]};
  padding: 5px;
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

const Ship = ({ users, votes }) => {
  return (
    <StyledShipBox>
      <Row className="mx-auto">
        <Col className="p-0">
          <Row className="mx-auto">
            <StyledProfilePic />
            <StyledProfilePic />
          </Row>
          <Row className="mx-auto mt-2">
            <StyledPrimaryText>{users[0]}</StyledPrimaryText>
          </Row>
          <Row className="mx-auto">
            <StyledSecondaryText>and</StyledSecondaryText>
          </Row>
          <Row className="mx-auto">
            <StyledPrimaryText>{users[1]}</StyledPrimaryText>
          </Row>
        </Col>
        <Col xs="auto" className="p-0">
          <StyledBtnBackground
            className={votes === 69 || votes === 5 ? "active" : ""}
          >
            <HiArrowUp style={{ display: "block" }} />
          </StyledBtnBackground>
          <Row className="mx-auto mt-1 justify-content-center">
            <StyledSecondaryText>{votes}</StyledSecondaryText>
          </Row>
        </Col>
      </Row>
    </StyledShipBox>
  );
};

export default Ship;
