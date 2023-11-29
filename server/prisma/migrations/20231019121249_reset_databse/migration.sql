-- CreateEnum
CREATE TYPE "BabyGender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "problemaSuspeitoTransporte" AS ENUM ('AEREO', 'CLINICO', 'EMERGENCIAL', 'POS_TRAUMA', 'SAMU', 'SEM_REMOCAO');

-- CreateEnum
CREATE TYPE "problemaSuspeitoDiabetes" AS ENUM ('HIPOGLICEMIA', 'HIPERGLICEMIA');

-- CreateEnum
CREATE TYPE "problemaSuspeitoObstetrico" AS ENUM ('PARTO_GESTACIONAL', 'GESTANTE', 'HEMORRAGIA_EXCESSIVA');

-- CreateEnum
CREATE TYPE "problemaSuspeitoRespiratorio" AS ENUM ('DPOC', 'INLACAO_FUMACA');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "reportDate" TIMESTAMP(3),
    "name" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "cpf" TEXT,
    "phone" TEXT,
    "reportPlace" TEXT,
    "bloodPressure" INTEGER,
    "bodyTemp" INTEGER,
    "bodyPulse" INTEGER,
    "breathing" INTEGER,
    "saturation" INTEGER,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report_PreHospitalMethod" (
    "id" SERIAL NOT NULL,
    "PreHospitalMethodOwnerId" INTEGER NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Report_PreHospitalMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report_Symptoms" (
    "id" SERIAL NOT NULL,
    "SymptomsOwnerId" INTEGER NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Report_Symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreHospitalMethod" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PreHospitalMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symptoms" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GestationalAnamnesis" (
    "id" SERIAL NOT NULL,
    "PreNatal" BOOLEAN,
    "DoctorName" TEXT,
    "NumberSon" INTEGER,
    "HiPressure" BOOLEAN,
    "BagRuptured" BOOLEAN,
    "VisualInspection" BOOLEAN,
    "Childbirth" BOOLEAN,
    "BornHour" TEXT,
    "BabyName" TEXT,
    "FinalRemarks" TEXT,
    "ReportOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "Complications" BOOLEAN,
    "gestationalPeriod" TIMESTAMP(3),
    "ContractionSchedule" TEXT,
    "Duration" TEXT,
    "Interval" TEXT,
    "BabyGender" "BabyGender",

    CONSTRAINT "GestationalAnamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anamnesis" (
    "id" SERIAL NOT NULL,
    "SignsAndSymptoms" TEXT,
    "HappenedTimes" BOOLEAN,
    "SinceHappened" TEXT,
    "HealthProblem" BOOLEAN,
    "HealthProlemsWhich" TEXT,
    "Medication" BOOLEAN,
    "MedicationWhich" TEXT,
    "HourMedication" TEXT,
    "Allergies" BOOLEAN,
    "AllergiesWhich" TEXT,
    "IngestedFood" BOOLEAN,
    "WhatTimeFood" TEXT,
    "FinalRemarks" TEXT,
    "ReportOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Anamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Glasglow" (
    "id" SERIAL NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "eyeOpeningOwnerId" INTEGER NOT NULL,
    "verbalResponseOwnerId" INTEGER NOT NULL,
    "motorResponseOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Glasglow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspectProblems" (
    "id" SERIAL NOT NULL,
    "problemaSuspeitoTransporte" TEXT[],
    "problemaSuspeitoDiabetes" TEXT[],
    "problemaSuspeitoObstetrico" TEXT[],
    "problemaSuspeitoRespiratorio" TEXT[],
    "Another" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ReportOwnerId" INTEGER,

    CONSTRAINT "SuspectProblems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinematicAvaliation" (
    "id" SERIAL NOT NULL,
    "comportamentalDisturb" BOOLEAN NOT NULL,
    "foundWithHelmet" BOOLEAN NOT NULL,
    "foundWithSeatbelt" BOOLEAN NOT NULL,
    "walkingInTheScene" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CinematicAvaliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finalization" (
    "id" SERIAL NOT NULL,
    "responsable" TEXT,
    "conduction" TEXT[],
    "transportation" TEXT,
    "finalRemarks" TEXT,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Finalization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_PreHospitalMethod_ReportOwnerId_PreHospitalMethodOwn_key" ON "Report_PreHospitalMethod"("ReportOwnerId", "PreHospitalMethodOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_Symptoms_ReportOwnerId_SymptomsOwnerId_key" ON "Report_Symptoms"("ReportOwnerId", "SymptomsOwnerId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_PreHospitalMethod" ADD CONSTRAINT "Report_PreHospitalMethod_PreHospitalMethodOwnerId_fkey" FOREIGN KEY ("PreHospitalMethodOwnerId") REFERENCES "PreHospitalMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_PreHospitalMethod" ADD CONSTRAINT "Report_PreHospitalMethod_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_SymptomsOwnerId_fkey" FOREIGN KEY ("SymptomsOwnerId") REFERENCES "Symptoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreHospitalMethod" ADD CONSTRAINT "PreHospitalMethod_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symptoms" ADD CONSTRAINT "Symptoms_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GestationalAnamnesis" ADD CONSTRAINT "GestationalAnamnesis_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnesis" ADD CONSTRAINT "Anamnesis_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Glasglow" ADD CONSTRAINT "Glasglow_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuspectProblems" ADD CONSTRAINT "SuspectProblems_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finalization" ADD CONSTRAINT "Finalization_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
