/*
  Warnings:

  - Made the column `ReportOwnerId` on table `SuspectProblems` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "problemaSuspeitoDiabetes" ADD VALUE 'null';

-- AlterEnum
ALTER TYPE "problemaSuspeitoObstetrico" ADD VALUE 'null';

-- AlterEnum
ALTER TYPE "problemaSuspeitoRespiratorio" ADD VALUE 'null';

-- AlterEnum
ALTER TYPE "problemaSuspeitoTransporte" ADD VALUE 'null';

-- AlterTable
ALTER TABLE "SuspectProblems" ALTER COLUMN "ReportOwnerId" SET NOT NULL;
