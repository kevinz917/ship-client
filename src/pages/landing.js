import "../global_styles/animation.css";
import {
  Body,
  Header1,
  Header2,
  Header3,
  SubtitleMain,
} from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import Shipbanner from "../assets/shipbanner.png";
import { Base } from "../util/base";

const randNum = (a, b) => {
  return Math.random() * (b - a) + a;
};
const Landing = () => {
  const setCoordinates = (x, y) => {
    // place new ship
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
        <img src={Shipbanner} alt="Ship banner" style={{ maxWidth: "100%" }} />
        <br />
        <br />
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="w-100 d-flex flex-column align-items-center bob">
            <Header1>Ship</Header1>
            <Body className="text-center">
              Ship friends, vote on couples. Have fun this Valentine's!
              <br /> - From the creators of YPost
            </Body>
          </div>
          <br />
          <hr />
          <MainBtn
            primary
            onClick={() => {
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

// <div
// style={{
//   position: "absolute",
//   left: `${location[0]}px`,
//   top: `${location[1]}px`,
//   fontSize: "50px",
// }}
// className="fade-in"
// >
// 🚢
// </div>
