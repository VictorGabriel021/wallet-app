import * as yup from "yup";

const schemaStep1 = yup
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
  transactionId: yup.number().required("TransactionId é obrigatório"),
});

export const getReverseStepSchema = (activeStep?: number) => {
  switch (activeStep) {
    case 1:
      return schemaStep1;
    default:
      return yup.object({}) as any;
  }
};
