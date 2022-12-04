/*
  Warnings:

  - You are about to drop the column `userId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `readPermissionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `writePermissionId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `readPermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `writePermission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_readPermissionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_writePermissionId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "readPermissionId",
DROP COLUMN "writePermissionId";

-- AlterTable
ALTER TABLE "readPermission" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "writePermission" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "readPermission" ADD CONSTRAINT "readPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writePermission" ADD CONSTRAINT "writePermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
