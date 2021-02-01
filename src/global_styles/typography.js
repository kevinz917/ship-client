import styled from "styled-components";

export const Header1 = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 38px;
`;

export const Header2 = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 34px;
`;

export const Header3 = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  font-size: 28px;
`;

export const Body = styled.div`
  color: ${({ theme }) => theme.text[0]};
  font-size: 18px;
`;

export const SubtitleMain = styled.div`
  color: ${({ theme }) => theme.text[1]};
  font-size: 15px;
`;
