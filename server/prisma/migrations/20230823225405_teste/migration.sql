/*
  Warnings:

  - You are about to drop the `Report_Symptoms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Symptoms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report_Symptoms" DROP CONSTRAINT "Report_Symptoms_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Report_Symptoms" DROP CONSTRAINT "Report_Symptoms_SymptomsOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Symptoms" DROP CONSTRAINT "Symptoms_ReportOwnerId_fkey";

-- DropTable
DROP TABLE "Report_Symptoms";

-- DropTable
DROP TABLE "Symptoms";
