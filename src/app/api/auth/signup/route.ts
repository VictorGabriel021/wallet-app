import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { schema } from "@/validations/auth/signupSchema";

import { formatForNumber } from "@/shared/utils/formatters/documentsMask";

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

  const { name, email, password, phone, taxNumber } = body;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { taxNumber }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Usuário com esse email ou (CPF/CNPJ) já existe!" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone: formatForNumber(phone),
      taxNumber: formatForNumber(taxNumber),
    },
  });

  return NextResponse.json(
    { message: "Usuário criado com sucesso!", user },
    { status: 201 }
  );
}
