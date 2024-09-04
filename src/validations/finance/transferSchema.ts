import { formatForNumber } from "@/shared/utils/formatters/documentsMask";
import {
  validCNPJ,
  validCpf,
  validCpfOrCnpjProp,
} from "@/shared/utils/validations";
import * as yup from "yup";

const schemaStep1 = ({ balance, taxNumber: senderTaxNumber }: any) =>
  yup
    .object({
      amount: yup
        .string()
        .test("min-value", "O valor mínimo do depósito é R$ 1,00", (value) => {
          const numericValue = parseFloat(
            value?.replace(/\./g, "").replace(",", ".") || "0"
          );
          return numericValue >= 1;
        })
        .test(
          "max-value",
          "Saldo insuficiente para essa transferência",
          (value) => {
            const numericValue = parseFloat(
              value?.replace(/\./g, "").replace(",", ".") || "0"
            );
            return numericValue <= balance;
          }
        )
        .required("O valor é obrigatório"),
      taxNumber: yup
        .string()
        .required("CPF ou CNPJ é obrigatório")
        .test(
          "isValid",
          "CPF ou CNPJ inválido",
          (taxNumber: validCpfOrCnpjProp) =>
            validCNPJ(taxNumber) || validCpf(taxNumber)
        )
        .test(
          "isDifferent",
          "Você não pode transferir para si mesmo",
          function (value) {
            return formatForNumber(value) !== senderTaxNumber;
          }
        ),
    })
    .required();

const schemaStep3 = yup
  .object({
    password: yup
      .string()
      .required("A senha é obrigatória")
      .matches(
        /^(?=.*[A-Z]).{6,}$/,
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula."
      ),
  })
  .required();

export const schema = (user: any) =>
  yup.object().shape({
    ...schemaStep1(user).fields,
    ...schemaStep3.fields,
    senderId: yup.number().required("SenderId é obrigatório"),
  });

export const getTransferStepSchema = (activeStep?: number, user?: any) => {
  switch (activeStep) {
    case 0:
      return schemaStep1(user);
    case 2:
      return schemaStep3;
    default:
      return yup.object({}) as any;
  }
};
