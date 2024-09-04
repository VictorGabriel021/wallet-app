import styled from "styled-components";

import { Box } from "@mui/material";

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 24;
  padding: 16px;

  @media (max-width: 450px) {
    width: 250px;
  }

  @media (max-width: 300px) {
    width: 230px;
  }
`;
