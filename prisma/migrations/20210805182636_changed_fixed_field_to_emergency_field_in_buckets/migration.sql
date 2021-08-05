/*
  Warnings:

  - You are about to drop the column `fixed` on the `Bucket` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bucket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "goalAmount" REAL NOT NULL,
    "recurring" BOOLEAN NOT NULL,
    "emergency" BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bucket" ("goalAmount", "id", "name", "ownerId", "recurring") SELECT "goalAmount", "id", "name", "ownerId", "recurring" FROM "Bucket";
DROP TABLE "Bucket";
ALTER TABLE "new_Bucket" RENAME TO "Bucket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
