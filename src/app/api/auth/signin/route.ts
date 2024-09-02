import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { compare } from "bcryptjs";

import { schema } from "@/validations/auth/signinSchema";
import { createSession } from "@/lib/session";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  try {
    await schema.validate(body, { abortEarly: false });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Dados inválidos", errors: error.errors },
      { status: 400 }
    );
  }

  const { email, password } = body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    return NextResponse.json(
      { message: "Usuário não encontrado!" },
      { status: 404 }
    );
  }

  const isPasswordValid = await compare(password, existingUser.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Senha inválida!" }, { status: 400 });
  }

  await createSession(existingUser.id as unknown as string);

  return NextResponse.json(
    { message: "Usuário autenticado com sucesso!" },
    { status: 200 }
  );
}
