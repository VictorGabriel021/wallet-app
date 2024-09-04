import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { schema } from "@/validations/finance/depositSchema";
import { compare } from "bcryptjs";
import { convertToFloat } from "@/shared/utils/formatters/currency";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.userId) {
    return NextResponse.json(
      { message: "O usuário não está logado" },
      { status: 400 }
    );
  }

  try {
    await schema.validate(body, { abortEarly: false });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Dados inválidos", errors: error.errors },
      { status: 400 }
    );
  }

  const { userId, amount, type, password } = body;

  const existingUser = await prisma.user.findUnique({ where: { id: +userId } });
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

  const amountInFloat = convertToFloat(amount);

  await prisma.$transaction(async (prisma) => {
    await prisma.user.update({
      where: { id: +userId },
      data: { balance: { increment: amountInFloat } },
    });
    await prisma.transaction.create({
      data: {
        amount: amountInFloat,
        type,
        senderId: +userId,
      },
    });
  });

  return NextResponse.json(
    { message: "Depositado com sucesso!" },
    { status: 200 }
  );
}
