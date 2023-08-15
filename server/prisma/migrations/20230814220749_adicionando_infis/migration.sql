/*
  Warnings:

  - The `gender` column on the `Report` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "gender",
ADD COLUMN     "gender" INTEGER;

-- CreateTable
CREATE TABLE "PreHospitalMethod" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "PreHospitalMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symptons" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Symptons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreHospitalMethod" ADD CONSTRAINT "PreHospitalMethod_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Symptons" ADD CONSTRAINT "Symptons_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
