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
CREATE TABLE "PreHospitalMethod" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "PreHospitalMethod_pkey" PRIMARY KEY ("id")
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
    "eyeOpeningOwnerId" INTEGER NOT NULL,
    "verbalResponseOwnerId" INTEGER NOT NULL,
    "motorResponseOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Glasglow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuspectProblems" (
    "id" SERIAL NOT NULL,
    "Another" TEXT NOT NULL,
    "reportId" INTEGER,

    CONSTRAINT "SuspectProblems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problems" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "suspectProblemsId" INTEGER,

    CONSTRAINT "Problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CinematicAvaliation" (
    "id" SERIAL NOT NULL,
    "comportamentalDisturb" BOOLEAN NOT NULL,
    "foundWithHelmet" BOOLEAN NOT NULL,
    "foundWithSeatbelt" BOOLEAN NOT NULL,
    "walkingInTheScene" BOOLEAN NOT NULL,

    CONSTRAINT "CinematicAvaliation_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_SymptomsOwnerId_fkey" FOREIGN KEY ("SymptomsOwnerId") REFERENCES "Symptoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "SuspectProblems" ADD CONSTRAINT "SuspectProblems_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problems" ADD CONSTRAINT "Problems_suspectProblemsId_fkey" FOREIGN KEY ("suspectProblemsId") REFERENCES "SuspectProblems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
