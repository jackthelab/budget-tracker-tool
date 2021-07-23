/*
  Warnings:

  - Added the required column `fixed` to the `Bucket` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bucket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "goalAmount" REAL NOT NULL,
    "currentAmount" REAL NOT NULL,
    "recurring" BOOLEAN NOT NULL,
    "fixed" BOOLEAN NOT NULL,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bucket" ("currentAmount", "goalAmount", "id", "name", "ownerId", "recurring") SELECT "currentAmount", "goalAmount", "id", "name", "ownerId", "recurring" FROM "Bucket";
DROP TABLE "Bucket";
ALTER TABLE "new_Bucket" RENAME TO "Bucket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
