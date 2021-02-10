import { useEffect, useState } from "react";
import styled from "styled-components";
import "../global_styles/animation.css";
import { Body, Header1 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import Shipbanner from "../assets/shipbanner.png";
import { Base } from "../util/base";
import { sendAmplitudeData } from "../util/amplitude";
import { countShips } from "../api/ship";
import Scroll from "../assets/landing.gif";
import LandingBanner from "../assets/landingbanner.png";
import BackgroundGradient from "../assets/gradientbackground.png";

const randNum = (a, b) => {
  return Math.random() * (b - a) + a;
};

const Box = styled.div`
  border: 2.5px solid black;
  max-width: 450px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  z-index: 100;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
`;

const placeShip = (x, y) => {
  const newDiv = document.createElement("div");
  newDiv.style.position = `absolute`;
  newDiv.style.left = `${x - 25}px`;
  newDiv.style.top = `${y - 25}px`;
  newDiv.style.fontSize = `${randNum(10, 100)}px`;
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
//   for (let i = 0; i < 20; i++) {
//     let w = randNum(0, width);
//     let h = randNum(0, height);
//     placeShip(w, h);
//   }
// };

// initialPlacement();

const Landing = () => {
  sendAmplitudeData("visit_landing");

  const [shipCount, setShipCount] = useState(-1);

  useEffect(() => {
    const onMount = async () => {
      let res = await countShips();
      setShipCount(res);
    };

    onMount();
  }, []);

  const setCoordinates = (x, y) => {
    // place new ship
    sendAmplitudeData("place_ships");
    placeShip(x, y);
  };

  return (
    <div
      className="vw-100 vh-100"
      onClick={(e) => setCoordinates(e.clientX, e.clientY)}
      id="main"
      style={{
        backgroundImage: `url(${BackgroundGradient})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        paddingTop: "40px",
      }}
    >
      <Box className="bob">
        <img
          src={LandingBanner}
          alt="Ship banner"
          style={{ maxWidth: "100%" }}
        />
        <div className="w-100 h-100 p-3 d-flex flex-column align-items-center">
          <div className="w-100">
            <Body>
              <br />
              Hey Yalies ~ <br />
              <br />
              Creators of YPost are back with Ship, a fun way to set up your
              friends this Valentine's day. Enjoy!
            </Body>
          </div>
          <br />
          <br />
          <MainBtn
            primary
            width="100%"
            onClick={() => {
              sendAmplitudeData("login");
              window.location.href = `${Base}/auth/cas`;
            }}
          >
            Log in with CAS
          </MainBtn>
          <Body>
            Total ships: {shipCount === -1 ? "Loading..." : shipCount}
          </Body>
        </div>
      </Box>
    </div>
  );
};

export default Landing;
