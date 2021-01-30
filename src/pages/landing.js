import styled from "styled-components";

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
`;

const Body = styled.div`
  font-size: 18px;
  color: #bbbbbb;
  line-height: 150%;
`;

const Landing = () => {
  return (
    <Container>
      <BorderedContainer>
        <Header1>~ Ship ~</Header1>
        <Body>From the creators of YPost</Body>
        <Body>Coming this Valentine's</Body>
      </BorderedContainer>
    </Container>
  );
};

export default Landing;
