"use client";

import { useEffect, useState } from "react";

export default function LivrosPage() {
  const [livros, setLivros] = useState<any[]>([]);
  const [isbn, setIsbn] = useState("");

  async function carregarLivros() {
    const res = await fetch("/api/livros/consultar");
    const data = await res.json();
    setLivros(data);
  }

  async function cadastrarLivro() {
    if (!isbn) return;

    await fetch("/api/livros/consultar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isbn }),
    });

    setIsbn("");
    carregarLivros();
  }

  async function emprestarLivro(itemId: number) {
    const matricula = prompt("Digite a matrícula:");
    if (!matricula) return;

    await fetch("/api/emprestar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId,
        matricula,
      }),
    });

    carregarLivros();
  }

  async function devolverLivro(emprestimoId: number) {
    await fetch("/api/devolver", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emprestimoId }),
    });

    carregarLivros();
  }

  async function renovarLivro(emprestimoId: number) {
    await fetch("/api/renovar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emprestimoId }),
    });

    carregarLivros();
  }

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Livros</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Digite o ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button onClick={cadastrarLivro}>
          Cadastrar
        </button>
      </div>

      {livros.map((livro) => {
        const emprestimoAtivo = livro.emprestimos?.[0];
        const emprestado = !!emprestimoAtivo;

        const dataDev = emprestimoAtivo?.dataDev
          ? new Date(emprestimoAtivo.dataDev)
          : null;

        const atrasado =
          dataDev && dataDev.getTime() < new Date().getTime();

        return (
          <div
            key={livro.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              display: "flex",
              gap: "15px",
            }}
          >
            {livro.foto && (
              <img
                src={livro.foto}
                alt={livro.titulo}
                style={{
                  width: "120px",
                  height: "auto",
                  borderRadius: "4px",
                }}
              />
            )}

            <div>
              <h2>{livro.titulo}</h2>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>ISBN:</strong> {livro.isbn}</p>

              {livro.resumo && (
                <p style={{ marginTop: "10px" }}>
                  {livro.resumo}
                </p>
              )}

              <div style={{ marginTop: "10px" }}>
                {emprestado ? (
                  <>
                    <p style={{ color: "red" }}>
                      📕 Emprestado
                    </p>

                    <p>
                      <strong>Matrícula:</strong>{" "}
{emprestimoAtivo.matricula}                    </p>

                    <p>
                      <strong>Devolver até:</strong>{" "}
                      {dataDev?.toLocaleDateString()}
                    </p>

                    {atrasado && (
                      <p style={{ color: "darkred", fontWeight: "bold" }}>
                        ⚠️ ATRASADO
                      </p>
                    )}

                    <button
                      onClick={() =>
                        renovarLivro(emprestimoAtivo.id)
                      }
                      style={{ marginRight: "10px" }}
                    >
                      Renovar
                    </button>

                    <button
                      onClick={() =>
                        devolverLivro(emprestimoAtivo.id)
                      }
                    >
                      Devolver
                    </button>
                  </>
                ) : (
                  <>
                    <p style={{ color: "green" }}>
                      📗 Disponível
                    </p>

                    <button
                      onClick={() =>
                        emprestarLivro(livro.id)
                      }
                    >
                      Emprestar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}