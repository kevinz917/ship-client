import styled from "styled-components";
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

const Landing = () => {
  return (
    <div
      style={{ maxWidth: "700px", padding: "10px" }}
      className="ml-auto mr-auto mt-lg-4 mt-1 fade-in"
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
  );
};

export default Landing;
