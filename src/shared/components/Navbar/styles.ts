import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 25px 40px;

  @media (max-width: 550px) {
    flex-direction: column;
    gap: 15px;
    padding: 20px 0;
  }
`;

export const NavbarContainer = styled.nav`
  display: flex;
  gap: 10px;
`;
