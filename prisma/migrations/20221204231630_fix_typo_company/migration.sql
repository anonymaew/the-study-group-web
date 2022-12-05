/*
  Warnings:

  - You are about to drop the column `compantId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_compantId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "compantId",
ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "MainCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;
