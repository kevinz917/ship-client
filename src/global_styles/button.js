import styled from "styled-components";

export const MainBtn = styled.button`
  border-radius: 0;
  box-shadow: -6px 6px 0 0
    ${({ theme, primary }) => (primary ? "#8a8a8a" : theme.primary)};
  transition: 0.3s;
  font-size: 17px;
  font-weight: 600;
  padding: 8px 14px;
  background-color: ${({ theme, primary, secondary }) =>
    primary ? "#c9c9c9" : secondary ? theme.secondary : theme.orange};
  color: ${({ theme, primary }) => (primary ? "#8a8a8a" : theme.primary)};
  border: 2.5px solid
    ${({ theme, primary }) => (primary ? "#8a8a8a" : theme.primary)};

  width: ${(props) => props.width};

  &:hover {
    background: transparent;
    box-shadow: ${({ theme, primary }) =>
        primary ? "-6px 6px 0 0 #8a8a8a" : `0 0 0 0 ${theme.primary}`},
      inset 108px 72px 0 0
        ${({ theme, primary }) => (primary ? "#8a8a8a" : theme.primary)};
    color: ${({ theme, primary }) =>
      primary ? theme.primary : theme.secondary};
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

  &:hover {
    background-color: ${(props) =>
      props.clicked
        ? ({ theme }) => theme.primaryDark
        : ({ theme }) => theme.surface[3]};
  }

  &:active {
    background-color: ${({ theme }) => theme.primary};
    color: white;
    transform: scale(0.9);
  }
`;
