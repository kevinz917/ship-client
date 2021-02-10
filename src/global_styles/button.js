import styled from "styled-components";

export const MainBtn = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) =>
    props.primary
      ? ({ theme }) => theme.primary
      : props.secondary
      ? ({ theme }) => theme.secondary
      : null};

  color: ${(props) =>
    props.primary ? "white" : props.secondary ? "black" : null};

  font-size: 17px;
  font-weight: 600;
  padding: 8px 14px;
  border: 2.5px solid black;
  transition: 0.1s;
  margin: 4px 0;
  width: ${(props) => props.width};

  &:hover {
    background: ${(props) =>
      props.primary
        ? ({ theme }) => theme.primaryDark
        : props.secondary
        ? ({ theme }) => theme.secondaryDark
        : null};
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Voting btn
export const VotingBtn = styled.div`
  background-color: ${(props) =>
    props.clicked
      ? ({ theme }) => theme.primary
      : ({ theme }) => theme.surface[2]};

  color: ${(props) => (props.clicked ? ({ theme }) => "#FFFFFF" : "#000000")};

  padding: 7px;
  cursor: pointer;
  transition: 0.05s transform;

  &:active {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(0.9);
  }
`;
