-- CreateTable
CREATE TABLE "houses" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "houses_uuid_key" ON "houses"("uuid");

-- CreateIndex
CREATE INDEX "houses_region_idx" ON "houses"("region");

-- CreateIndex
CREATE INDEX "houses_region_name_idx" ON "houses"("region", "name");
