"use client";

import { useCallback, useEffect, useState } from "react";

import {
  BalanceText,
  CardContainer,
  CardContent,
  TransactionContainer,
  TransactionScroll,
  TransactionTitle,
} from "./styles";

import { Button } from "@mui/material";

import { getAllTransactionFinance } from "@/services/financeService";
import { getUserInfo } from "@/services/userService";

import DepositForm from "./components/DepositForm";
import TransferForm from "./components/TransferForm";
import ReverseForm from "./components/ReverseForm";

import Loading from "@/shared/components/Loading";
import { formatToBRL } from "@/shared/utils/formatters/currency";
import { getOperationStatus } from "@/shared/utils/status/getOperationStatus";

enum IDashBoardFormEnum {
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  REVERSE = "REVERSE",
}

const DashboardPage = () => {
  const [user, setUser] = useState<any>();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formType, setFormType] = useState<IDashBoardFormEnum>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onOpenModalHandler = (type: IDashBoardFormEnum, data?: any) => {
    handleOpen();
    setFormType(type);
    if (data) setSelectedTransaction(data);
  };

  const fetchBalance = useCallback(async () => {
    setIsLoading(true);
    const response = await getUserInfo();
    setIsLoading(false);

    if (response.success) {
      setUser(response.data);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    const response = await getAllTransactionFinance();
    setIsLoading(false);

    if (response.success) {
      setTransactions(response.data);
    }
  }, []);

  const onfetchData = useCallback(() => {
    fetchBalance();
    fetchTransactions();
  }, [fetchBalance, fetchTransactions]);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, [fetchBalance, fetchTransactions]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <BalanceText>
        SALDO: {user?.balance ? formatToBRL(user.balance) : "R$ 0,00"}
      </BalanceText>
      <CardContainer>
        <CardContent>
          <h2>Depósito</h2>
          <Button
            variant="text"
            onClick={() => onOpenModalHandler(IDashBoardFormEnum.DEPOSIT)}
          >
            Fazer um depósito
          </Button>
        </CardContent>

        <CardContent>
          <h2>Transferência</h2>
          <Button
            variant="text"
            onClick={() => onOpenModalHandler(IDashBoardFormEnum.TRANSFER)}
          >
            Fazer uma transferência
          </Button>
        </CardContent>

        {!!transactions.length && (
          <CardContent>
            <TransactionScroll>
              <TransactionTitle>Transações</TransactionTitle>
              <hr />
              {transactions.map(({ type, receiverName, amount, id }) => (
                <TransactionContainer key={id}>
                  <h4>{getOperationStatus(type)}</h4>
                  <h4>{receiverName}</h4>
                  <h4>{formatToBRL(amount)}</h4>
                  <Button
                    variant="text"
                    onClick={() =>
                      onOpenModalHandler(IDashBoardFormEnum.REVERSE, {
                        type,
                        receiverName,
                        amount,
                        id,
                      })
                    }
                  >
                    Reverter Transação
                  </Button>
                </TransactionContainer>
              ))}
            </TransactionScroll>
          </CardContent>
        )}
      </CardContainer>

      {formType === IDashBoardFormEnum.DEPOSIT && (
        <DepositForm
          handleClose={handleClose}
          open={open}
          fetchData={onfetchData}
        />
      )}

      {formType === IDashBoardFormEnum.TRANSFER && (
        <TransferForm
          handleClose={handleClose}
          open={open}
          user={user}
          fetchData={onfetchData}
        />
      )}

      {formType === IDashBoardFormEnum.REVERSE && (
        <ReverseForm
          handleClose={handleClose}
          open={open}
          transaction={selectedTransaction}
          fetchData={onfetchData}
        />
      )}
    </div>
  );
};

export default DashboardPage;
