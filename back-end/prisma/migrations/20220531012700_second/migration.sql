-- CreateTable
CREATE TABLE "Consult" (
    "id" SERIAL NOT NULL,
    "Operation" TEXT NOT NULL,
    "Day" TEXT NOT NULL,
    "Time" TEXT NOT NULL,
    "Client" TEXT NOT NULL,

    CONSTRAINT "Consult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consult_id_key" ON "Consult"("id");
