/*
  Warnings:

  - You are about to drop the `CoursePublish` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoursePublish" DROP CONSTRAINT "CoursePublish_approverId_fkey";

-- DropForeignKey
ALTER TABLE "CoursePublish" DROP CONSTRAINT "CoursePublish_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "approverId" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "CoursePublish";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
