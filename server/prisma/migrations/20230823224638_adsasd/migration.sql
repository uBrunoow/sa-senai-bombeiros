/*
  Warnings:

  - You are about to drop the column `reportId` on the `Report` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Report_reportId_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reportId";
