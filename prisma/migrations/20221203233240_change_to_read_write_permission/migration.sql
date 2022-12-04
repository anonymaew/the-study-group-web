/*
  Warnings:

  - You are about to drop the `StudentEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PageToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentEnrollment" DROP CONSTRAINT "StudentEnrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentEnrollment" DROP CONSTRAINT "StudentEnrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherEnrollment" DROP CONSTRAINT "TeacherEnrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherEnrollment" DROP CONSTRAINT "TeacherEnrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PageToUser" DROP CONSTRAINT "_PageToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PageToUser" DROP CONSTRAINT "_PageToUser_B_fkey";

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "readPermissionId" TEXT,
ADD COLUMN     "writePermissionId" TEXT;

-- DropTable
DROP TABLE "StudentEnrollment";

-- DropTable
DROP TABLE "TeacherEnrollment";

-- DropTable
DROP TABLE "_PageToUser";

-- CreateTable
CREATE TABLE "readPermission" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "readPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writePermission" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "writePermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_readPermissionId_fkey" FOREIGN KEY ("readPermissionId") REFERENCES "readPermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_writePermissionId_fkey" FOREIGN KEY ("writePermissionId") REFERENCES "writePermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readPermission" ADD CONSTRAINT "readPermission_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writePermission" ADD CONSTRAINT "writePermission_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
