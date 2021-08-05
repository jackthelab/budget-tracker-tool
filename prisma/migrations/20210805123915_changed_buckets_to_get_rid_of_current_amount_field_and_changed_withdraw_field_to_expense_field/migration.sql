/*
  Warnings:

  - You are about to drop the column `currentAmount` on the `Bucket` table. All the data in the column will be lost.
  - You are about to drop the column `withdraw` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `expense` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bucket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "goalAmount" REAL NOT NULL,
    "recurring" BOOLEAN NOT NULL,
    "fixed" BOOLEAN NOT NULL,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Bucket" ("fixed", "goalAmount", "id", "name", "ownerId", "recurring") SELECT "fixed", "goalAmount", "id", "name", "ownerId", "recurring" FROM "Bucket";
DROP TABLE "Bucket";
ALTER TABLE "new_Bucket" RENAME TO "Bucket";
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "bucketId" INTEGER,
    "expense" BOOLEAN NOT NULL,
    "amount" REAL NOT NULL,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("bucketId") REFERENCES "Bucket" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "bucketId", "id", "ownerId") SELECT "amount", "bucketId", "id", "ownerId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
