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

  &:hover {
    background: ${(props) =>
      props.primary
        ? ({ theme }) => theme.primaryDark
        : props.secondary
        ? ({ theme }) => theme.secondaryDark
        : null};
  }
`;
