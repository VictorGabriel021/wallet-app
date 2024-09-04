import styled from "styled-components";

import Image from "next/image";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 25px 40px;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 200px;
`;

export const NavbarContainer = styled.nav`
  display: flex;
  gap: 10px;
`;
