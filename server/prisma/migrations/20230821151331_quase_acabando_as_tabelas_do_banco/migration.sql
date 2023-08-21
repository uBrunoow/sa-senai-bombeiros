/*
  Warnings:

  - You are about to drop the `Symptons` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Symptons" DROP CONSTRAINT "Symptons_ReportOwnerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Symptons";

-- CreateTable
CREATE TABLE "Report_PreHospitalMethod" (
    "id" SERIAL NOT NULL,
    "PreHospitalMethodOwnerId" INTEGER NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Report_PreHospitalMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report_Symptoms" (
    "id" SERIAL NOT NULL,
    "SymptomsOwnerId" INTEGER NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Report_Symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symptoms" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GestationalAnamnesis" (
    "id" SERIAL NOT NULL,
    "gestationalPeriod" TIMESTAMP(3) NOT NULL,
    "PreNatal" BOOLEAN NOT NULL,
    "DoctorName" TEXT NOT NULL,
    "Complications" TEXT NOT NULL,
    "NumberSon" INTEGER NOT NULL,
    "ContractionSchedule" TIMESTAMP(3) NOT NULL,
    "Duration" TIMESTAMP(3) NOT NULL,
    "Interval" TIMESTAMP(3) NOT NULL,
    "HiPressure" BOOLEAN NOT NULL,
    "BagRuptured" BOOLEAN NOT NULL,
    "VisualInspection" BOOLEAN NOT NULL,
    "Childbirth" BOOLEAN NOT NULL,
    "BabyGender" TEXT NOT NULL,
    "BornHour" TIMESTAMP(3) NOT NULL,
    "BabyName" TEXT NOT NULL,
    "FinalRemarks" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "GestationalAnamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anamnesis" (
    "id" SERIAL NOT NULL,
    "SignsAndSymptoms" TEXT NOT NULL,
    "HappenedTimes" BOOLEAN NOT NULL,
    "SinceHappened" TEXT NOT NULL,
    "HealthProblem" BOOLEAN NOT NULL,
    "HealthProlemsWhich" TEXT NOT NULL,
    "Medication" BOOLEAN NOT NULL,
    "MedicationWhich" TEXT NOT NULL,
    "HourMedication" TEXT NOT NULL,
    "Allergies" BOOLEAN NOT NULL,
    "AllergiesWhich" TEXT NOT NULL,
    "IngestedFood" BOOLEAN NOT NULL,
    "WhatTimeFood" TEXT NOT NULL,
    "FinalRemarks" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Anamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Glasglow" (
    "id" SERIAL NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "eyeOpening" INTEGER NOT NULL,
    "verbalResponse" INTEGER NOT NULL,
    "motorResponse" INTEGER NOT NULL,

    CONSTRAINT "Glasglow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspectProblems" (
    "id" SERIAL NOT NULL,
    "classOwnerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "reportId" INTEGER,

    CONSTRAINT "SuspectProblems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspectProblemsClasses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SuspectProblemsClasses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_PreHospitalMethod_ReportOwnerId_PreHospitalMethodOwn_key" ON "Report_PreHospitalMethod"("ReportOwnerId", "PreHospitalMethodOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_Symptoms_ReportOwnerId_SymptomsOwnerId_key" ON "Report_Symptoms"("ReportOwnerId", "SymptomsOwnerId");

-- AddForeignKey
ALTER TABLE "Report_PreHospitalMethod" ADD CONSTRAINT "Report_PreHospitalMethod_PreHospitalMethodOwnerId_fkey" FOREIGN KEY ("PreHospitalMethodOwnerId") REFERENCES "PreHospitalMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_PreHospitalMethod" ADD CONSTRAINT "Report_PreHospitalMethod_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_SymptomsOwnerId_fkey" FOREIGN KEY ("SymptomsOwnerId") REFERENCES "Symptoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symptoms" ADD CONSTRAINT "Symptoms_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GestationalAnamnesis" ADD CONSTRAINT "GestationalAnamnesis_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnesis" ADD CONSTRAINT "Anamnesis_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Glasglow" ADD CONSTRAINT "Glasglow_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspectProblems" ADD CONSTRAINT "SuspectProblems_classOwnerId_fkey" FOREIGN KEY ("classOwnerId") REFERENCES "SuspectProblemsClasses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspectProblems" ADD CONSTRAINT "SuspectProblems_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
