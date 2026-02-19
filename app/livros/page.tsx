export default async function LivrosPage() {
  const res = await fetch("http://localhost:3000/api/livros/consultar", {
    cache: "no-store",
  });

  const livros = await res.json();

  return (
    <div>
      <h1>Lista de Livros</h1>

      {livros.map((livro: any) => (
        <div key={livro.id}>
          {livro.titulo}
        </div>
      ))}
    </div>
  );
}
