/*
  Warnings:

  - The `Complications` column on the `GestationalAnamnesis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `reportId` on the `SuspectProblems` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SuspectProblems" DROP CONSTRAINT "SuspectProblems_reportId_fkey";

-- AlterTable
ALTER TABLE "GestationalAnamnesis" ALTER COLUMN "gestationalPeriod" DROP NOT NULL,
ALTER COLUMN "PreNatal" DROP NOT NULL,
ALTER COLUMN "DoctorName" DROP NOT NULL,
DROP COLUMN "Complications",
ADD COLUMN     "Complications" BOOLEAN,
ALTER COLUMN "NumberSon" DROP NOT NULL,
ALTER COLUMN "ContractionSchedule" DROP NOT NULL,
ALTER COLUMN "Duration" DROP NOT NULL,
ALTER COLUMN "Interval" DROP NOT NULL,
ALTER COLUMN "HiPressure" DROP NOT NULL,
ALTER COLUMN "BagRuptured" DROP NOT NULL,
ALTER COLUMN "VisualInspection" DROP NOT NULL,
ALTER COLUMN "Childbirth" DROP NOT NULL,
ALTER COLUMN "BabyGender" DROP NOT NULL,
ALTER COLUMN "BornHour" DROP NOT NULL,
ALTER COLUMN "BabyName" DROP NOT NULL,
ALTER COLUMN "FinalRemarks" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SuspectProblems" DROP COLUMN "reportId",
ADD COLUMN     "ReportOwnerId" INTEGER;

-- AddForeignKey
ALTER TABLE "SuspectProblems" ADD CONSTRAINT "SuspectProblems_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
