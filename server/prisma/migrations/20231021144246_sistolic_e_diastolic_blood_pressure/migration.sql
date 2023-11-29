/*
  Warnings:

  - You are about to drop the column `bloodPressure` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "bloodPressure",
ADD COLUMN     "diastolicBloodPressure" INTEGER,
ADD COLUMN     "systolicBloodPressure" INTEGER;
