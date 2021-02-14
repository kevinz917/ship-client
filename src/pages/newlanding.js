import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "react-bootstrap";
import { countShips } from "../api/ship";
import { MainBtn } from "../global_styles/button";
import { Body } from "../global_styles/typography";
import "../global_styles/animation.css";
import { Base } from "../util/base";
import { initAmplitude, sendAmplitudeData } from "../util/amplitude";
import Hero from "../assets/hero.png";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 450px) {
    margin-top: 20px;
    flex-direction: column;
    max-width: 100%;
    padding: 20px;
  }
`;

const StyledTitle = styled.span`
  font-size: 60px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 450px) {
    font-size: 40px;
    font-weight: 700;
  }
`;

const HeroContainer = styled.div`
  margin-left: 50px;
  display: flex;
  @media (max-width: 450px) {
    width: 100%;
    margin-left: 0;
    margin-top: 30px;
  }
`;

const HeroImage = styled.img`
  width: 450px;
  margin: auto;
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const StyledDescription = styled.span`
  font-size: 20px;
  font-weight: 500;
  opacity: 0.8;
`;

const randNum = (a, b) => {
  return Math.random() * (b - a) + a;
};

const placeShip = (x, y) => {
  const newDiv = document.createElement("div");
  const size = randNum(10, 100);
  newDiv.style.position = `absolute`;
  newDiv.style.left = `${x - size / 2}px`;
  newDiv.style.top = `${y - size / 2}px`;
  newDiv.style.fontSize = `${size}px`;
  newDiv.className = "rock";
  newDiv.style.opacity = Math.random();
  const newContent = document.createTextNode("🚢");
  newDiv.appendChild(newContent);

  const currentDiv = document.getElementById("root");
  document.body.insertBefore(newDiv, currentDiv);
};

const Landing = () => {
  const [shipCnt, setShipCnt] = useState(-1);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    const onMount = async () => {
      setLoading(true);

      console.log("sending data");
      sendAmplitudeData("visit_landing");

      // Fetch user info
      let count = await countShips();
      console.log(count);
      setShipCnt(count);
      setLoading(false);
    };
    onMount();
  }, []);

  const setCoordinates = (x, y) => {
    // place new ship
    sendAmplitudeData("place_ships");
    placeShip(x, y);
  };

  return (
    <Container style={{ minHeight: "calc(100vh - 106px)" }}>
      <div className={"my-auto fade-in"} style={{ maxWidth: "400px" }}>
        <Row className="mx-auto">
          <StyledTitle>
            Ship friends,
            <br />
            Vote couples.
          </StyledTitle>
        </Row>
        <Row className="mx-auto mt-4 mb-5">
          <StyledDescription style={{ maxWidth: "500px" }}>
            <div className="mb-3">Hey Yalies ~</div>
            Thank you for using Ship! We're keeping this site up so you can
            revisit some memories ~ Enjoy!
            <br />- 2021
          </StyledDescription>
          <Body className="mt-4">
            Total ships: {shipCnt === -1 ? "Loading..." : shipCnt}
          </Body>
        </Row>
        <MainBtn
          width="100%"
          onClick={async () => {
            sendAmplitudeData("login");
            window.location.href = `${Base}/auth/cas`;
          }}
        >
          Log in with CAS
        </MainBtn>
      </div>
      <HeroContainer className="fade-in rock-slow">
        <HeroImage src={Hero} alt="hero" />
      </HeroContainer>
    </Container>
  );
};

export default Landing;
