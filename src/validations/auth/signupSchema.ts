import * as yup from "yup";

import {
  validCpfOrCnpjProp,
  validCNPJ,
  validCpf,
} from "@/shared/utils/validations";

export const schema = yup
  .object({
    name: yup.string().required("O Nome é obrigatório"),
    taxNumber: yup
      .string()
      .required("CPF ou CNPJ é obrigatório")
      .test(
        "isValid",
        "CPF ou CNPJ inválido",
        (taxNumber: validCpfOrCnpjProp) =>
          validCNPJ(taxNumber) || validCpf(taxNumber)
      ),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .matches(
        /^(?=.*[A-Z]).{6,}$/,
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula."
      ),
    email: yup
      .string()
      .required("O Email é obrigatório")
      .matches(
        /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "O e-mail que você digitou não é um formato válido!"
      ),
    phone: yup
      .string()
      .required("O celular é obrigatório")
      .min(15, "Celular inválido"),
  })
  .required();
