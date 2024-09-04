import * as yup from "yup";

const schemaStep1 = yup
  .object({
    amount: yup
      .string()
      .test("min-value", "O valor mínimo do depósito é R$ 1,00", (value) => {
        const numericValue = parseFloat(
          value?.replace(/\./g, "").replace(",", ".") || "0"
        );
        return numericValue >= 1;
      })
      .required("O valor é obrigatório"),
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

export const schema = yup.object().shape({
  ...schemaStep1.fields,
  ...schemaStep3.fields,
  userId: yup.number().required("UserId é obrigatório"),
});

export const getDepositStepSchema = (activeStep?: number) => {
  switch (activeStep) {
    case 0:
      return schemaStep1;
    case 2:
      return schemaStep3;
    default:
      return yup.object({}) as any;
  }
};
