import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { emprestimoId } = await req.json();

    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: emprestimoId },
    });

    if (!emprestimo || emprestimo.devolvido) {
      return NextResponse.json(
        { error: "Empréstimo inválido." },
        { status: 400 }
      );
    }

    const renovado = await prisma.emprestimo.update({
      where: { id: emprestimoId },
      data: {
        dataDev: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json(renovado);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao renovar." },
      { status: 500 }
    );
  }
}