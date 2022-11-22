-- CreateTable
CREATE TABLE "houses" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("uuid")
);

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
CREATE UNIQUE INDEX "houses_hash_key" ON "houses"("hash");

-- CreateIndex
CREATE INDEX "houses_region_idx" ON "houses"("region");

-- CreateIndex
CREATE INDEX "houses_start_at_idx" ON "houses"("start_at");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_houseUuid_key" ON "profiles"("houseUuid");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_houseUuid_fkey" FOREIGN KEY ("houseUuid") REFERENCES "houses"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
