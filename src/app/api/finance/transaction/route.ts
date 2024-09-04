import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "O usuário não está logado" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { id: +userId } });
  if (!existingUser) {
    return NextResponse.json(
      { message: "Usuário não encontrado!" },
      { status: 404 }
    );
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      senderId: +userId,
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  const filteredTransactions = transactions.map(
    ({ sender, receiver, ...transaction }) => {
      return {
        ...transaction,
        senderName: sender.name,
        receiverName: receiver?.name,
      };
    }
  );

  return NextResponse.json([...filteredTransactions], { status: 200 });
}
