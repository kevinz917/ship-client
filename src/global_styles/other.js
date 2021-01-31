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
