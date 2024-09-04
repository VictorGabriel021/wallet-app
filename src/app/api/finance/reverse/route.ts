import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import { IOperationEnum } from "@/shared/enums/transfer";

import { schema } from "@/validations/finance/reverseSchema";
import { compare } from "bcryptjs";

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

  const { transactionId, password } = body;

  if (!transactionId) {
    return NextResponse.json(
      { message: "O id da transação é obrigatório!" },
      { status: 400 }
    );
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id: +transactionId },
    include: {
      sender: true,
      receiver: true,
    },
  });

  if (!transaction) {
    return NextResponse.json(
      { message: "Transação não encontrada!" },
      { status: 404 }
    );
  }

  const { type, amount, senderId, receiverId, sender } = transaction;

  const isPasswordValid = await compare(password, sender.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Senha inválida!" }, { status: 400 });
  }

  await prisma.$transaction(async (prisma) => {
    if (type === IOperationEnum.DEPOSIT) {
      await prisma.user.update({
        where: { id: senderId },
        data: { balance: { decrement: amount } },
      });
    } else if (type === IOperationEnum.TRANSFER) {
      await prisma.user.update({
        where: { id: senderId },
        data: { balance: { increment: amount } },
      });
      await prisma.user.update({
        where: { id: receiverId! },
        data: { balance: { decrement: amount } },
      });
    }
    await prisma.transaction.delete({ where: { id: +transactionId } });
  });

  return NextResponse.json(
    { message: "Transação revertida com sucesso!" },
    { status: 200 }
  );
}
