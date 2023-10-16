/*
  Warnings:

  - Added the required column `ReportOwnerId` to the `Finalization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Finalization" ADD COLUMN     "ReportOwnerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Finalization" ADD CONSTRAINT "Finalization_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
