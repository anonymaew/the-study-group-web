/*
  Warnings:

  - You are about to drop the column `readPermissionId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `writePermissionId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `readPermissionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `writePermissionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `readPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `writePermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_readPermissionId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_writePermissionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_readPermissionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_writePermissionId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "readPermissionId",
DROP COLUMN "writePermissionId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "readPermissionId",
DROP COLUMN "writePermissionId";

-- DropTable
DROP TABLE "readPermission";

-- DropTable
DROP TABLE "writePermission";

-- CreateTable
CREATE TABLE "TeacherEnrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "TeacherEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentEnrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" "StudentEnrollmentStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "StudentEnrollment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeacherEnrollment" ADD CONSTRAINT "TeacherEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherEnrollment" ADD CONSTRAINT "TeacherEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrollment" ADD CONSTRAINT "StudentEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEnrollment" ADD CONSTRAINT "StudentEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
