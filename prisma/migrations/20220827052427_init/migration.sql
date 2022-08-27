-- CreateTable
CREATE TABLE "houses" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "certificate_number" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "phone_number" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "freeze_date" TIMESTAMP(3),
    "freeze2_date" TIMESTAMP(3),
    "qualification_date" TIMESTAMP(3),

    CONSTRAINT "houses_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "page" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "houses_region_start_at_status_idx" ON "houses"("region", "start_at", "status");

-- CreateIndex
CREATE UNIQUE INDEX "requests_hash_key" ON "requests"("hash");
