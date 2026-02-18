/*
  Warnings:

  - You are about to drop the `Livro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Livro";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "matricula" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ALUNO',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "isbn" TEXT,
    "resumo" TEXT,
    "fotoUrl" TEXT,
    "rfidTag" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "dataEmprestimo" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataDevolucao" DATETIME NOT NULL,
    "devolvido" BOOLEAN NOT NULL DEFAULT false,
    "renovacoes" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Emprestimo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_matricula_key" ON "Usuario"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Item_isbn_key" ON "Item"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Item_rfidTag_key" ON "Item"("rfidTag");
