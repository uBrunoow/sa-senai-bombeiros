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

-- CreateEnum
CREATE TYPE "localTraumaSide" AS ENUM ('RIGHT', 'LEFT');

-- CreateEnum
CREATE TYPE "localTraumaFace" AS ENUM ('FRONT', 'BACK');

-- CreateEnum
CREATE TYPE "localTraumasBodyPart" AS ENUM ('COSTAS', 'PESCOCO', 'GLUTEOS', 'BRACO', 'ANTEBRACO', 'PESCOCOPERNA', 'COXA', 'CABECA');

-- CreateEnum
CREATE TYPE "tipoTrauma" AS ENUM ('FRATURA', 'DIVERSOS', 'HEMORRAGIAS', 'ESVICERACAO', 'FAV_FAV', 'AMPUTACAO', 'QUEIMADURA_1GRAU', 'QUEIMADURA_2GRAU', 'QUEIMADURA_3GRAU');

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "perfusion" TEXT;

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
    "gestationalPeriodStart" TIMESTAMP(3),
    "gestationalPeriodEnd" TIMESTAMP(3),
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
    "eyeOpeningOwnerId" INTEGER,
    "verbalResponseOwnerId" INTEGER,
    "motorResponseOwnerId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Glasglow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspectProblems" (
    "id" SERIAL NOT NULL,
    "problemaSuspeitoTransporte" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "problemaSuspeitoDiabetes" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "problemaSuspeitoObstetrico" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "problemaSuspeitoRespiratorio" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "Another" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "SuspectProblems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinematicAvaliation" (
    "id" SERIAL NOT NULL,
    "comportamentalDisturb" BOOLEAN,
    "foundWithHelmet" BOOLEAN,
    "foundWithSeatbelt" BOOLEAN,
    "walkingInTheScene" BOOLEAN,
    "damagedWindshield" BOOLEAN,
    "damagedPanel" BOOLEAN,
    "twistedSteering" BOOLEAN,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "CinematicAvaliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finalization" (
    "id" SERIAL NOT NULL,
    "responsable" TEXT,
    "conduction" TEXT[],
    "transportation" TEXT,
    "CollectedObjects" TEXT,
    "finalRemarks" TEXT,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Finalization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trauma" (
    "id" SERIAL NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "tipo" "tipoTrauma" NOT NULL,
    "bodyPart" "localTraumasBodyPart" NOT NULL,
    "side" "localTraumaSide" NOT NULL,
    "face" "localTraumaFace" NOT NULL,

    CONSTRAINT "trauma_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "CinematicAvaliation" ADD CONSTRAINT "CinematicAvaliation_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finalization" ADD CONSTRAINT "Finalization_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trauma" ADD CONSTRAINT "trauma_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
