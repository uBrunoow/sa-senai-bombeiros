/*
  Warnings:

  - You are about to drop the `Anamnesis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CinematicAvaliation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Finalization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GestationalAnamnesis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Glasglow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PreHospitalMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report_PreHospitalMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report_Symptoms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuspectProblems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Symptoms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anamnesis" DROP CONSTRAINT "Anamnesis_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Finalization" DROP CONSTRAINT "Finalization_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "GestationalAnamnesis" DROP CONSTRAINT "GestationalAnamnesis_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Glasglow" DROP CONSTRAINT "Glasglow_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "PreHospitalMethod" DROP CONSTRAINT "PreHospitalMethod_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Report_PreHospitalMethod" DROP CONSTRAINT "Report_PreHospitalMethod_PreHospitalMethodOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Report_PreHospitalMethod" DROP CONSTRAINT "Report_PreHospitalMethod_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Report_Symptoms" DROP CONSTRAINT "Report_Symptoms_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Report_Symptoms" DROP CONSTRAINT "Report_Symptoms_SymptomsOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "SuspectProblems" DROP CONSTRAINT "SuspectProblems_ReportOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Symptoms" DROP CONSTRAINT "Symptoms_ReportOwnerId_fkey";

-- DropTable
DROP TABLE "Anamnesis";

-- DropTable
DROP TABLE "CinematicAvaliation";

-- DropTable
DROP TABLE "Finalization";

-- DropTable
DROP TABLE "GestationalAnamnesis";

-- DropTable
DROP TABLE "Glasglow";

-- DropTable
DROP TABLE "PreHospitalMethod";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Report_PreHospitalMethod";

-- DropTable
DROP TABLE "Report_Symptoms";

-- DropTable
DROP TABLE "SuspectProblems";

-- DropTable
DROP TABLE "Symptoms";

-- DropEnum
DROP TYPE "BabyGender";

-- DropEnum
DROP TYPE "problemaSuspeitoDiabetes";

-- DropEnum
DROP TYPE "problemaSuspeitoObstetrico";

-- DropEnum
DROP TYPE "problemaSuspeitoRespiratorio";

-- DropEnum
DROP TYPE "problemaSuspeitoTransporte";
