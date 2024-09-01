import axios from "axios";

import { FailAlert, SuccessAlert } from "@/shared/utils/toastyAlerts";

interface IBodyUserSignup {
  name: string;
  email: string;
  password: string;
  phone: string;
  taxNumber: string;
}

interface ISignupResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const signupUser = async (
  body: IBodyUserSignup
): Promise<ISignupResponse> => {
  try {
    const response = await axios.post("/api/auth/signup", body);

    SuccessAlert({
      label: response.data.message,
    });

    return { success: true, data: response.data.user };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Ocorreu um erro em seu processo!";

    FailAlert({
      label: errorMessage,
    });

    return { success: false, error: errorMessage };
  }
};
