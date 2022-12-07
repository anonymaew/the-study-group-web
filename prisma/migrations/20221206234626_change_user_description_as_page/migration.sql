/*
  Warnings:

  - You are about to drop the column `details` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "details",
ADD COLUMN     "descriptionId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
