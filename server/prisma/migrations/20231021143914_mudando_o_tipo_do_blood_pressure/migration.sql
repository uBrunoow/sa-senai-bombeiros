/*
  Warnings:

  - Added the required column `perfusion` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Made the column `ReportOwnerId` on table `SuspectProblems` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "perfusion" AS ENUM ('MAIOR_DOIS_SEGUNDOS', 'MENOR_DOIS_SEGUNDOS');

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "perfusion" "perfusion" NOT NULL,
ALTER COLUMN "bloodPressure" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SuspectProblems" ALTER COLUMN "problemaSuspeitoTransporte" SET DEFAULT ARRAY['']::TEXT[],
ALTER COLUMN "problemaSuspeitoDiabetes" SET DEFAULT ARRAY['']::TEXT[],
ALTER COLUMN "problemaSuspeitoObstetrico" SET DEFAULT ARRAY['']::TEXT[],
ALTER COLUMN "problemaSuspeitoRespiratorio" SET DEFAULT ARRAY['']::TEXT[],
ALTER COLUMN "ReportOwnerId" SET NOT NULL;
