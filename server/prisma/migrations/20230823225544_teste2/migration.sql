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

-- CreateIndex
CREATE UNIQUE INDEX "Report_Symptoms_ReportOwnerId_SymptomsOwnerId_key" ON "Report_Symptoms"("ReportOwnerId", "SymptomsOwnerId");

-- AddForeignKey
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_SymptomsOwnerId_fkey" FOREIGN KEY ("SymptomsOwnerId") REFERENCES "Symptoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report_Symptoms" ADD CONSTRAINT "Report_Symptoms_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symptoms" ADD CONSTRAINT "Symptoms_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
