/*
  Warnings:

  - A unique constraint covering the columns `[taxNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_taxNumber_key" ON "User"("taxNumber");
