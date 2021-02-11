import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row } from "react-bootstrap";
import { fetchUser } from "../api/user";
import { fetchMyShips } from "../api/ship";
import { MainBtn } from "../global_styles/button";
import "../global_styles/animation.css";
import { Base } from "../util/base";
import { sendAmplitudeData } from "../util/amplitude";

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

const StyledTitle = styled.span`
  font-size: 60px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 450px) {
    font-size: 40px;
    font-weight: 700;
  }
`;

const StyledDescription = styled.span`
  font-size: 26px;
  font-weight: 500;
  line-height: 1.2;
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
  // newDiv.style.zIndex = 10;
  newDiv.style.opacity = Math.random();
  const newContent = document.createTextNode("🚢");
  newDiv.appendChild(newContent);

  const currentDiv = document.getElementById("root");
  document.body.insertBefore(newDiv, currentDiv);
};

// Place ships randomly
// const initialPlacement = () => {
//   const { innerWidth: width, innerHeight: height } = window;
//   for (let i = 0; i < 10; i++) {
//     let w = randNum(0, width);
//     let h = randNum(0, height);
//     placeShip(w, h);
//   }
// };

// initialPlacement();

const Landing = () => {
  const [name, setName] = useState("");
  const [shipCnt, setShipCnt] = useState(0);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    const onMount = async () => {
      setLoading(true);
      // Fetch user info
      let fetchedUser = await fetchUser();
      setName(fetchedUser.name.split(" ")[0]);
      let fetchedShips = await fetchMyShips();
      setShipCnt(fetchedShips.length);
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
        <div className={"my-auto fade-in"}>
          <Row className="mx-auto">
            <StyledTitle>
              Ship friends.
              <br />
              Vote couples.
            </StyledTitle>
          </Row>
          <Row className="mx-auto mt-4 mb-5">
            <StyledDescription style={{ maxWidth: "500px" }}>
              <div className="mb-3">Hey Yalies ~</div>
              The creators of YPost are back with Ship, a fun way to set up your
              friends this Valentine's day :)
            </StyledDescription>
          </Row>
          <MainBtn
            secondary
            width="100%"
            onClick={() => {
              sendAmplitudeData("login");
              window.location.href = `${Base}/auth/cas`;
            }}
          >
            Log in with CAS
          </MainBtn>
        </div>
      </StyledTitleBackground>
    </StyledBackground>
  );
};

export default Landing;
