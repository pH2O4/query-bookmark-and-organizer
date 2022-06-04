/*
  Warnings:

  - A unique constraint covering the columns `[Function]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Function" TEXT NOT NULL DEFAULT E'Atendente';

-- CreateIndex
CREATE UNIQUE INDEX "User_Function_key" ON "User"("Function");
