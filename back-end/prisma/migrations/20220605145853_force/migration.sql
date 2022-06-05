-- DropIndex
DROP INDEX "Consult_Dentist_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "IsHeSheNeedTradePass" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "OperationTime" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operation_id_key" ON "Operation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Operation_Name_key" ON "Operation"("Name");
