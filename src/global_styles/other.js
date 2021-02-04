import styled from "styled-components";

export const MainInput = styled.input`
  width: 350px;
  max-width: 400px;
  border: none;
  color: ${({ theme }) => theme.text[0]};
  background-color: #f0f0f0;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 17px;

  &:active,
  &:focus {
    outline: none;
  }
`;

export const DeleteMarker = styled.div`
  margin-left: -2px;
  cursor: pointer;
  opacity: 0.2;
  transition: 0.1s;
  display: inline-block;

  &:hover {
    opacity: 1;
    transition: 0.1s;
  }
`;

export const HeaderBlock = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  background-color: #f3f2ff;
`;

// Shipping leaderboard page
export const StyledProfilePic = styled.span`
  background-color: ${({ theme }) => theme.surface[2]};
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

export const StyledShipBox = styled.div`
  width: 275px;
  background-color: ${({ theme }) => theme.surface[1]};
  border-radius: 2px;

  border-radius: 8px;
  padding: 16px;
  margin: 10px;

  box-shadow: ${(props) => (props.mine ? "0px 0px 20px #D6D6FF" : null)};
  border: ${(props) => (props.mine ? "1px solid #8C8CFF" : null)};

  @media (max-width: 450px) {
    width: 100%;
  }
`;

export const NewshipContainer = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 450px) {
    max-width: 100%;
  }
`;
