import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import "../global_styles/animation.css";
import Logo from "../assets/logo.png";

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #d0a3f5;
`;

const StyledDescription = styled.span`
  font-size: 20px;
  font-weight: 500;
  font-family: futura-pt, sans-serif;
  max-width: 500px;
  text-align: center;
`;

const tempLanding = () => {
  return (
    <StyledContainer>
      <div className="m-auto bob">
        <Row className="mx-auto mb-2 justify-content-center">
          <img width={200} height={100} src={Logo} />
        </Row>
        <Row className="mx-auto justify-content-center">
          <StyledDescription>
            <strong>Have some fun this Valentine's day.</strong>
            <br />
            From the creators of YPost.
            <br />✨ Coming February 11th ✨
          </StyledDescription>
        </Row>
      </div>
    </StyledContainer>
  );
};

export default tempLanding;
