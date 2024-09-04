import axiosApi from "./axios";

import Cookies from "js-cookie";

import { FailAlert, SuccessAlert } from "@/shared/utils/toastyAlerts";

import { IOperationEnum } from "@/shared/enums/transfer";

interface IBodyDepositFinance {
  amount: number;
  password: string;
  userId: number;
}

interface IBodyTransferFinance {
  senderId: number;
  taxNumber: string;
  amount: number;
  password: string;
  balance: number;
}

interface IBodyReverseFinance {
  transactionId: number;
  password: string;
}

interface IFinanceResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const depositFinance = async (
  body: IBodyDepositFinance
): Promise<IFinanceResponse> => {
  try {
    const userId = Cookies.get("userId");

    const response = await axiosApi.post("/finance/deposit", {
      ...body,
      userId,
      type: IOperationEnum.DEPOSIT,
    });

    SuccessAlert({
      label: response.data.message,
    });

    return { success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro em seu processo!";

    FailAlert({
      label: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};

export const transferFinance = async (
  body: IBodyTransferFinance
): Promise<IFinanceResponse> => {
  try {
    const senderId = Cookies.get("userId");
    const response = await axiosApi.post("/finance/transfer", {
      ...body,
      senderId,
      type: IOperationEnum.TRANSFER,
    });

    SuccessAlert({
      label: response.data.message,
    });

    return { success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro em seu processo!";

    FailAlert({
      label: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};

export const reverseFinance = async (
  body: IBodyReverseFinance
): Promise<IFinanceResponse> => {
  try {
    const response = await axiosApi.post("/finance/reverse", body);

    SuccessAlert({
      label: response.data.message,
    });

    return { success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro em seu processo!";

    FailAlert({
      label: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};

export const getAllTransactionFinance = async (): Promise<IFinanceResponse> => {
  try {
    const userId = Cookies.get("userId");

    const response = await axiosApi.get("/finance/transaction", {
      params: {
        userId,
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro em seu processo!";

    FailAlert({
      label: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};
