/*
  Warnings:

  - You are about to drop the column `authorId` on the `Page` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_authorId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "authorId";

-- CreateTable
CREATE TABLE "_PageToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PageToUser_AB_unique" ON "_PageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToUser_B_index" ON "_PageToUser"("B");

-- AddForeignKey
ALTER TABLE "_PageToUser" ADD CONSTRAINT "_PageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToUser" ADD CONSTRAINT "_PageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
