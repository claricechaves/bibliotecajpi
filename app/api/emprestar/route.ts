import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { matricula, itemId } = await req.json();

    const emprestimoAtivo = await prisma.emprestimo.findFirst({
      where: {
        itemId,
        devolvido: false,
      },
    });

    if (emprestimoAtivo) {
      return NextResponse.json(
        { error: "Item já está emprestado." },
        { status: 400 }
      );
    }

    const novoEmprestimo = await prisma.emprestimo.create({
      data: {
        itemId,
        matricula, // salva direto como texto
        dataDev: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json(novoEmprestimo);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao emprestar item." },
      { status: 500 }
    );
  }
}