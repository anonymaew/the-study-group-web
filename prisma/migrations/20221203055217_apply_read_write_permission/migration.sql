/*
  Warnings:

  - You are about to drop the `StudentEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherEnrollment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentEnrollment" DROP CONSTRAINT "StudentEnrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentEnrollment" DROP CONSTRAINT "StudentEnrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherEnrollment" DROP CONSTRAINT "TeacherEnrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherEnrollment" DROP CONSTRAINT "TeacherEnrollment_teacherId_fkey";

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "readPermissionId" TEXT,
ADD COLUMN     "writePermissionId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "readPermissionId" TEXT,
ADD COLUMN     "writePermissionId" TEXT;

-- DropTable
DROP TABLE "StudentEnrollment";

-- DropTable
DROP TABLE "TeacherEnrollment";

-- CreateTable
CREATE TABLE "readPermission" (
    "id" TEXT NOT NULL,

    CONSTRAINT "readPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writePermission" (
    "id" TEXT NOT NULL,

    CONSTRAINT "writePermission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_readPermissionId_fkey" FOREIGN KEY ("readPermissionId") REFERENCES "readPermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_writePermissionId_fkey" FOREIGN KEY ("writePermissionId") REFERENCES "writePermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_readPermissionId_fkey" FOREIGN KEY ("readPermissionId") REFERENCES "readPermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_writePermissionId_fkey" FOREIGN KEY ("writePermissionId") REFERENCES "writePermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
