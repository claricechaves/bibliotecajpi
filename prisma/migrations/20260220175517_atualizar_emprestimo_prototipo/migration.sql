-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emprestimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER,
    "matricula" TEXT,
    "itemId" INTEGER NOT NULL,
    "dataEmp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataDev" DATETIME,
    "devolvido" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Emprestimo_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Emprestimo" ("alunoId", "dataDev", "dataEmp", "devolvido", "id", "itemId") SELECT "alunoId", "dataDev", "dataEmp", "devolvido", "id", "itemId" FROM "Emprestimo";
DROP TABLE "Emprestimo";
ALTER TABLE "new_Emprestimo" RENAME TO "Emprestimo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
