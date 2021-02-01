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
    props.primary ? "white" : props.secondary ? "#8D8D8D" : null};

  font-size: 17px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
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
  border-radius: 8px;
  cursor: pointer;
  transition: 0.05s transform;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;
