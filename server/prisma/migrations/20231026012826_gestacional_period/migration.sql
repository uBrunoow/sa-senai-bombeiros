/*
  Warnings:

  - You are about to drop the column `gestationalPeriod` on the `GestationalAnamnesis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GestationalAnamnesis" DROP COLUMN "gestationalPeriod",
ADD COLUMN     "gestationalPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "gestationalPeriodStart" TIMESTAMP(3);
