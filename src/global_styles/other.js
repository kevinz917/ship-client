import styled from "styled-components";

export const MainInput = styled.input`
  width: 350px;
  max-width: 400px;
  border: none;
  color: ${({ theme }) => theme.text[0]};
  background-color: ${({ theme }) => theme.surface[1]};
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
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
`;
