import styled from "styled-components";

export const Header1 = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
  font-size: 38px;

  @media (max-width: 450px) {
    font-size: 30px;
  }
`;

export const Header2 = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 34px;

  @media (max-width: 450px) {
    font-size: 24px;
  }
`;

export const Header3 = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
  font-size: 28px;
`;

export const Body = styled.div`
  color: ${({ theme }) => theme.text[0]};
  font-size: 18px;
  font-weight: 600;

  @media (max-width: 450px) {
    font-size: 16px;
  }
`;

export const SubtitleMain = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 20px;
`;

export const SmallSubtitle = styled.div`
  color: ${({ theme }) => theme.text[1]};
  font-weight: 500;
  font-size: 14px;
`;
