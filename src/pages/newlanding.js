import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "react-bootstrap";
import { countShips } from "../api/ship";
import { MainBtn } from "../global_styles/button";
import { Body } from "../global_styles/typography";
import "../global_styles/animation.css";
import { Base } from "../util/base";
import { sendAmplitudeData } from "../util/amplitude";
import Hero from "../assets/hero.png";

const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#815ef2, #ead1ff);
  display: flex;
`;

const StyledTitleBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(
    circle at 10% 20%,
    rgba(255, 207, 181, 1) 0%,
    rgba(255, 207, 181, 0.8) 10%,
    rgba(255, 207, 181, 0.7) 20%,
    rgba(255, 207, 181, 0) 60%
  );
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.primary};
  padding: 50px;

  @media (max-width: 450px) {
    font-size: 40px;
    font-weight: 700;
    padding: 20px;
  }

  .loading {
    opacity: 0;
    pointer-events: none;
  }

  .loaded {
    transition: opacity 0.5s;
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 450px) {
    flex-direction: column;
    max-width: 100%;
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
  @media (max-width: 450px) {
    width: 100%;
    margin-left: 0;
    margin-top: 30px;
  }
`;

const HeroImage = styled.img`
  width: 450px;
  @media (max-width: 450px) {
    width: 100%;
  }
`;

const StyledDescription = styled.span`
  font-size: 20px;
  font-weight: 500;
  opacity: 0.8;

  /* @media (max-width: 450px) {
    font-size: 20px;
  } */
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
    <StyledBackground
      className="vw-100 vh-100"
      id="main"
      onClick={(e) => setCoordinates(e.clientX, e.clientY)}
    >
      <StyledTitleBackground>
        <Container>
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
                The creators of YPost are back with Ship, a fun way to set up
                your friends this Valentine's day :)
              </StyledDescription>
            </Row>
            <Row className="mx-auto">
              <Body>
                Total ships: {shipCnt === -1 ? "Loading..." : shipCnt}
              </Body>
            </Row>
            <MainBtn
              width="100%"
              onClick={() => {
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
      </StyledTitleBackground>
    </StyledBackground>
  );
};

export default Landing;
