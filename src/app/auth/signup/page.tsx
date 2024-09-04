"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { CardContainer, CardContent, Form } from "../styles";

import { Button, CircularProgress } from "@mui/material";

import { signupUser } from "@/services/userService";

import InputCustom from "@/shared/components/InputCustom";

import {
  formatCPF_CNPJ,
  formatPhone,
} from "@/shared/utils/formatters/documentsMask";

import { schema } from "@/validations/auth/signupSchema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { ContentToCenter } from "@/shared/styles/styles";

const SignUpPage = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const changeTaxNumberHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue("taxNumber", formatCPF_CNPJ(event));
  };

  const changePhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("phone", formatPhone(event.target.value));
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await signupUser(data);
    setIsLoading(false);

    if (response.success) {
      router.push("/auth/signin");
    }
  };

  return (
    <ContentToCenter>
      <CardContainer>
        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputCustom
              name="name"
              control={control}
              label="Nome*"
              errors={errors}
            />

            <InputCustom
              name="email"
              control={control}
              label="Email*"
              errors={errors}
            />

            <InputCustom
              name="phone"
              control={control}
              label="Celular*"
              errors={errors}
              onChange={changePhoneHandler}
            />

            <InputCustom
              name="taxNumber"
              control={control}
              label="CPF/CNPJ*"
              errors={errors}
              onChange={changeTaxNumberHandler}
            />

            <InputCustom
              name="password"
              type="password"
              control={control}
              label="Senha*"
              errors={errors}
              autoComplete="autoComplete"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              endIcon={
                isLoading && <CircularProgress color="inherit" size={18} />
              }
            >
              Cadastrar
            </Button>

            <Button variant="text" onClick={() => router.push("/")}>
              Login
            </Button>
          </Form>
        </CardContent>
      </CardContainer>
    </ContentToCenter>
  );
};

export default SignUpPage;
