/*
  Warnings:

  - You are about to drop the `readPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `writePermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "readPermission" DROP CONSTRAINT "readPermission_pageId_fkey";

-- DropForeignKey
ALTER TABLE "readPermission" DROP CONSTRAINT "readPermission_userId_fkey";

-- DropForeignKey
ALTER TABLE "writePermission" DROP CONSTRAINT "writePermission_pageId_fkey";

-- DropForeignKey
ALTER TABLE "writePermission" DROP CONSTRAINT "writePermission_userId_fkey";

-- DropTable
DROP TABLE "readPermission";

-- DropTable
DROP TABLE "writePermission";

-- CreateTable
CREATE TABLE "teacherEnrollment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "teacherEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentEnrollment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "studentEnrollment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teacherEnrollment" ADD CONSTRAINT "teacherEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherEnrollment" ADD CONSTRAINT "teacherEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollment" ADD CONSTRAINT "studentEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollment" ADD CONSTRAINT "studentEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
