"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { CardContainer, CardContent, Form } from "../styles";

import { Button, CircularProgress } from "@mui/material";

import { signinUser } from "@/services/userService";

import InputCustom from "@/shared/components/InputCustom";

import { schema } from "@/validations/auth/signinSchema";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const response = await signinUser(data);
    setIsLoading(false);

    if (response.success) {
      router.push("/dashboard");
    }
  };

  return (
    <CardContainer>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputCustom
            name="email"
            control={control}
            label="Email*"
            errors={errors}
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
            Entrar
          </Button>

          <Link href="/auth/signup" style={{ textAlign: "center" }}>
            <Button variant="text">Criar nova conta</Button>
          </Link>
        </Form>
      </CardContent>
    </CardContainer>
  );
};

export default SignInPage;
