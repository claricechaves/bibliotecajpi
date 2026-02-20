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

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div>
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

      {livros.map((livro) => (
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
        style={{ width: "120px", height: "auto", borderRadius: "4px" }}
      />
    )}

    <div>
      <h2>{livro.titulo}</h2>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>ISBN:</strong> {livro.isbn}</p>
      {livro.resumo && (
        <p style={{ marginTop: "10px" }}>{livro.resumo}</p>
      )}
    </div>
  </div>
))}
    </div>
  );
}