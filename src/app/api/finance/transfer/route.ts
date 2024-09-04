import { NextResponse } from "next/server";

import { compare } from "bcryptjs";

import { PrismaClient } from "@prisma/client";

import { schema } from "@/validations/finance/transferSchema";

import { convertToFloat } from "@/shared/utils/formatters/currency";
import { formatForNumber } from "@/shared/utils/formatters/documentsMask";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.senderId) {
    return NextResponse.json(
      { message: "O usuário não está logado" },
      { status: 400 }
    );
  }

  const { balance, senderTaxNumber, ...bodyRest } = body;

  const user = { balance, senderTaxNumber };

  try {
    await schema(user).validate(bodyRest, {
      abortEarly: false,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Dados inválidos", errors: error.errors },
      { status: 400 }
    );
  }

  const { senderId, taxNumber, amount, type, password } = bodyRest;

  const sender = await prisma.user.findUnique({ where: { id: +senderId } });
  if (!sender) {
    return NextResponse.json(
      { message: "O Usuário logado não foi encontrado!" },
      { status: 404 }
    );
  }

  const receiver = await prisma.user.findUnique({
    where: { taxNumber: formatForNumber(taxNumber) },
  });
  if (!receiver) {
    return NextResponse.json(
      { message: "O Usuário que você deseja transferir não foi encontrado!" },
      { status: 404 }
    );
  }

  const isPasswordValid = await compare(password, sender.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Senha inválida!" }, { status: 400 });
  }

  const amountInFloat = convertToFloat(amount);

  await prisma.$transaction(async (prisma) => {
    await prisma.user.update({
      where: { id: +senderId },
      data: { balance: { decrement: amountInFloat } },
    });
    await prisma.user.update({
      where: { id: receiver.id },
      data: { balance: { increment: amountInFloat } },
    });
    await prisma.transaction.create({
      data: {
        amount: amountInFloat,
        type,
        receiverId: receiver.id,
        senderId: +senderId,
      },
    });
  });

  return NextResponse.json(
    { message: "Transferido com sucesso!" },
    { status: 200 }
  );
}
