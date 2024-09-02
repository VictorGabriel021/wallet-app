import * as yup from "yup";

export const schema = yup
  .object({
    email: yup
      .string()
      .required("O Email é obrigatório")
      .matches(
        /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "O e-mail que você digitou não é um formato válido!"
      ),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .matches(
        /^(?=.*[A-Z]).{6,}$/,
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula."
      ),
  })
  .required();
