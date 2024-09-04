import styled from "styled-components";

import { Card } from "@/shared/styles/styles";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 380px;
  height: 100%;
  margin: 0 auto;
`;

export const CardContent = styled(Card)`
  max-width: 380px;
  height: fit-content;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
