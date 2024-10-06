/*
  Warnings:

  - Added the required column `handlesArrayLike` to the `PostAuthor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileUrlsArrayLike` to the `PostAuthor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostAuthor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vaultId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "handlesArrayLike" TEXT NOT NULL,
    "profileUrlsArrayLike" TEXT NOT NULL,
    "profilePictureSlug" TEXT,
    "profilePictureMediaId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PostAuthor_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "Vault" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PostAuthor_profilePictureMediaId_fkey" FOREIGN KEY ("profilePictureMediaId") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PostAuthor" ("createdAt", "id", "name", "profilePictureMediaId", "profilePictureSlug", "vaultId") SELECT "createdAt", "id", "name", "profilePictureMediaId", "profilePictureSlug", "vaultId" FROM "PostAuthor";
DROP TABLE "PostAuthor";
ALTER TABLE "new_PostAuthor" RENAME TO "PostAuthor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
