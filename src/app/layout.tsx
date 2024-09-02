import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Content } from "@/shared/styles/styles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StyledComponentsRegistry from "@/lib/registry";

import { AuthProvider } from "@/context/AuthContext";

import Navbar from "@/shared/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet App",
  description: "Welcome to wallet app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <Navbar />
            <Content>{children}</Content>
            <ToastContainer />
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
