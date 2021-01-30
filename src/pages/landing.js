import styled from "styled-components";
import "../styles/animation.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const BorderedContainer = styled.div`
  border: 3px dashed #cecece;
  box-sizing: border-box;
  border-radius: 16px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header1 = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: #294cff;
  line-height: 150%;
  text-align: center;
`;

const Body = styled.div`
  font-size: 18px;
  color: #bbbbbb;
  line-height: 150%;
  text-align: center;
`;

const Landing = () => {
  return (
    <Container className="bob">
      <Header1>~~ Ship ~~</Header1>
      <Body style={{ width: "400px" }}>
        Have some fun this Valentine's day. From the creators of YPost. Coming
        soon
      </Body>
    </Container>
  );
};

export default Landing;
