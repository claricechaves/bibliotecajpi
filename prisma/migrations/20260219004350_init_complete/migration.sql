-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "matricula" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "foto" TEXT,
    "resumo" TEXT,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "dataEmp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataDev" DATETIME,
    "devolvido" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Emprestimo_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Item_isbn_key" ON "Item"("isbn");
