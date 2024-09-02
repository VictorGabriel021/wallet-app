"use client";

import Link from "next/link";

import Image from "next/image";

import { Header, NavbarContainer } from "./styles";

import Logo from "@assets/logo.png";

import { Button } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Header>
      <Link href="/auth/signin">
        <Image src={Logo} alt="Wallet App Logo" priority />
      </Link>
      <NavbarContainer>
        {isAuthenticated ? (
          <ul>
            <li>
              <Button variant="text" onClick={logout}>
                Logout
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
