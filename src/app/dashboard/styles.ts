import styled from "styled-components";

import { Card } from "@/shared/styles/styles";

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: inherit;
  align-items: start;
  gap: 20px;
`;

export const CardContent = styled(Card)`
  button {
    margin-top: 5px;
    padding: 0;
    text-align: left;
  }
`;

export const TransactionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 35px;
  align-items: center;
  border-bottom: solid 1px;
`;

export const TransactionTitle = styled.h2`
  border-bottom: solid 1px;
`;

export const TransactionScroll = styled.div`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

export const BalanceText = styled.p`
  text-align: end;
  margin-bottom: 20px;
  color: #407bff;
  font-weight: bold;
`;
