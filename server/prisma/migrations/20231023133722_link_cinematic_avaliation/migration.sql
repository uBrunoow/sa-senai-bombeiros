/*
  Warnings:

  - Added the required column `ReportOwnerId` to the `CinematicAvaliation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CinematicAvaliation" ADD COLUMN     "ReportOwnerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CinematicAvaliation" ADD CONSTRAINT "CinematicAvaliation_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
