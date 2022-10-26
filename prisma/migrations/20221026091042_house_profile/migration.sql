/*
  Warnings:

  - You are about to drop the column `certificate_number` on the `houses` table. All the data in the column will be lost.
  - You are about to drop the column `freeze2_date` on the `houses` table. All the data in the column will be lost.
  - You are about to drop the column `freeze_date` on the `houses` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `houses` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `houses` table. All the data in the column will be lost.
  - You are about to drop the column `qualification_date` on the `houses` table. All the data in the column will be lost.
  - You are about to drop the column `range` on the `houses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "houses_hash_key";

-- DropIndex
DROP INDEX "houses_region_start_at_status_idx";

-- AlterTable
ALTER TABLE "houses" DROP COLUMN "certificate_number",
DROP COLUMN "freeze2_date",
DROP COLUMN "freeze_date",
DROP COLUMN "hash",
DROP COLUMN "phone_number",
DROP COLUMN "qualification_date",
DROP COLUMN "range";

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "detail" TEXT NOT NULL,
    "certificate_number" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "external_date" TIMESTAMP(3),
    "internal_date" TIMESTAMP(3),
    "qr_code_date" TIMESTAMP(3),
    "houseUuid" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_houseUuid_key" ON "profiles"("houseUuid");

-- CreateIndex
CREATE INDEX "houses_region_start_at_idx" ON "houses"("region", "start_at");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_houseUuid_fkey" FOREIGN KEY ("houseUuid") REFERENCES "houses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
