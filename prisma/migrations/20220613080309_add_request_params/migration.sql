/*
  Warnings:

  - You are about to drop the column `type` on the `requests` table. All the data in the column will be lost.
  - Added the required column `house_ids` to the `requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_params` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" DROP COLUMN "type",
ADD COLUMN     "house_ids" TEXT NOT NULL,
ADD COLUMN     "url_params" TEXT NOT NULL;

-- DropEnum
DROP TYPE "RequestType";
