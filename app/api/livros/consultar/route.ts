import { prisma } from "../../../../lib/db";
import { NextResponse } from "next/server";

type OpenLibraryBook = {
  title?: string;
  authors?: { name: string }[];
  cover?: { large?: string };
  excerpts?: { text?: string }[];
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { isbn } = body;

    if (!isbn) {
      return new NextResponse("ISBN não informado", { status: 400 });
    }

    // Verifica se o livro já existe
    const existente = await prisma.item.findUnique({ where: { isbn } });
    if (existente) {
      return NextResponse.json({ message: "Livro já cadastrado", livro: existente });
    }

    // Busca na Open Library
    const res = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    );
    const data = await res.json();
    const info: OpenLibraryBook = data[`ISBN:${isbn}`] || {};

    if (!info.title) {
      return new NextResponse("Livro não encontrado na Open Library", { status: 404 });
    }

    // Cria o livro automaticamente com os campos completos
    const livro = await prisma.item.create({
      data: {
        titulo: info.title,
        autor: info.authors?.map(a => a.name).join(", ") || "Autor não disponível",
        isbn,
        foto: info.cover?.large || "",
        resumo: info.excerpts?.[0]?.text || "",
        tipo: "LIVRO",
      },
    });

    return NextResponse.json({ message: "Livro cadastrado com sucesso", livro });
  } catch (error) {
    console.error(error);
    return new NextResponse("Erro interno no servidor", { status: 500 });
  }
}
