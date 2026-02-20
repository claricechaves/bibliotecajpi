import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { emprestimoId } = await req.json();

    await prisma.emprestimo.update({
      where: { id: emprestimoId },
      data: {
        devolvido: true,
        dataDev: new Date(),
      },
    });

    return NextResponse.json({ message: "Item devolvido com sucesso!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao devolver item." },
      { status: 500 }
    );
  }
}