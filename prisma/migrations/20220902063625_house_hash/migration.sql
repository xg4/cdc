/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `houses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `houses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "houses" ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "houses_hash_key" ON "houses"("hash");
