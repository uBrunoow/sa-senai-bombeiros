/*
  Warnings:

  - A unique constraint covering the columns `[reportId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reportId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "reportId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "gender" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Report_reportId_key" ON "Report"("reportId");
