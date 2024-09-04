"use client";

import Link from "next/link";

import { Header, NavbarContainer, StyledImage } from "./styles";

import Logo from "@assets/logo.png";

import { Button } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const onLogoutHandler = () => {
    logout();
    router.push("/auth/signin");
  };

  return (
    <Header>
      <Link href="/auth/signin">
        <StyledImage src={Logo} alt="Wallet App Logo" priority />
      </Link>
      <NavbarContainer>
        {isAuthenticated ? (
          <ul>
            <li>
              <Button variant="text" onClick={onLogoutHandler}>
                <ArrowBackIcon /> Sair
              </Button>
            </li>
          </ul>
        ) : (
          <>
            <ul>
              <li>
                <Link href="/auth/signin">
                  <Button variant="contained">Entrar</Button>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href="/auth/signup">
                  <Button variant="outlined">Cadastrar</Button>
                </Link>
              </li>
            </ul>
          </>
        )}
      </NavbarContainer>
    </Header>
  );
};

export default Navbar;
