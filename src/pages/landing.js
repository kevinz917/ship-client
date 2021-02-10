import { useEffect, useState } from "react";
import "../global_styles/animation.css";
import { Body, Header1 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import Shipbanner from "../assets/shipbanner.png";
import { Base } from "../util/base";
import { sendAmplitudeData } from "../util/amplitude";
import { countShips } from "../api/ship";
import Scroll from "../assets/landing.gif";

const randNum = (a, b) => {
  return Math.random() * (b - a) + a;
};
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
    const newDiv = document.createElement("div");
    newDiv.style.position = `absolute`;
    newDiv.style.left = `${x - 25}px`;
    newDiv.style.top = `${y - 25}px`;
    newDiv.style.fontSize = `${randNum(10, 100)}px`;
    const newContent = document.createTextNode("🚢");
    newDiv.appendChild(newContent);

    const currentDiv = document.getElementById("root");
    document.body.insertBefore(newDiv, currentDiv);
  };
  // <img src={Shipbanner} alt="Ship banner" style={{ maxWidth: "100%" }} />
  return (
    <div
      className="vw-100 vh-100"
      onClick={(e) => setCoordinates(e.clientX, e.clientY)}
      id="main"
    >
      <div
        style={{ maxWidth: "700px", padding: "10px" }}
        className="ml-auto mr-auto pt-lg-4 pt-1 fade-in"
      >
        <div className="w-100 d-flex flex-column align-items-center">
          <img src={Scroll} alt="scroll" style={{ maxWidth: "300px" }} />
        </div>
        <br />
        <br />
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="w-100 d-flex flex-column align-items-center">
            <Header1>Ship.wtf</Header1>
            <br />
            <Body className="text-center">
              Ship friends, vote on couples. Have fun this Valentine's!
              <br /> - From the creators of YPost
            </Body>
          </div>
          <br />
          <Body>
            Total ships: {shipCount === -1 ? "Loading..." : shipCount}
          </Body>
          <br />
          <MainBtn
            primary
            style={{ maxWidth: "300px" }}
            onClick={() => {
              sendAmplitudeData("login");
              window.location.href = `${Base}/auth/cas`;
            }}
          >
            Log in with CAS
          </MainBtn>
        </div>
      </div>
    </div>
  );
};

export default Landing;
