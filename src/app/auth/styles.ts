import styled from "styled-components";

import { Card } from "@/shared/styles/styles";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 380px;
`;

export const CardContent = styled(Card)`
  max-width: 380px;
  height: fit-content;

  @media (min-width: 460px) {
    margin: 0 auto;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
