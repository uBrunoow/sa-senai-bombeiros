/*
  Warnings:

  - The `gestationalPeriod` column on the `GestationalAnamnesis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ContractionSchedule` column on the `GestationalAnamnesis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Duration` column on the `GestationalAnamnesis` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Interval` column on the `GestationalAnamnesis` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GestationalAnamnesis" DROP COLUMN "gestationalPeriod",
ADD COLUMN     "gestationalPeriod" TIMESTAMP(3),
DROP COLUMN "ContractionSchedule",
ADD COLUMN     "ContractionSchedule" TIMESTAMP(3),
DROP COLUMN "Duration",
ADD COLUMN     "Duration" TIMESTAMP(3),
DROP COLUMN "Interval",
ADD COLUMN     "Interval" TIMESTAMP(3);
