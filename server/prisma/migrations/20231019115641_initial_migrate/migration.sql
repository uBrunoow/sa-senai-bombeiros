/*
  Warnings:

  - You are about to drop the `Problems` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "problemaSuspeitoTransporte" AS ENUM ('AEREO', 'CLINICO', 'EMERGENCIAL', 'POS_TRAUMA', 'SAMU', 'SEM_REMOCAO');

-- CreateEnum
CREATE TYPE "problemaSuspeitoDiabetes" AS ENUM ('HIPOGLICEMIA', 'HIPERGLICEMIA');

-- CreateEnum
CREATE TYPE "problemaSuspeitoObstetrico" AS ENUM ('PARTO_GESTACIONAL', 'GESTANTE', 'HEMORRAGIA_EXCESSIVA');

-- CreateEnum
CREATE TYPE "problemaSuspeitoRespiratorio" AS ENUM ('DPOC', 'INLACAO_FUMACA');

-- DropForeignKey
ALTER TABLE "Problems" DROP CONSTRAINT "Problems_suspectProblemsId_fkey";

-- AlterTable
ALTER TABLE "SuspectProblems" ADD COLUMN     "problemaSuspeitoDiabetes" TEXT[],
ADD COLUMN     "problemaSuspeitoObstetrico" TEXT[],
ADD COLUMN     "problemaSuspeitoRespiratorio" TEXT[],
ADD COLUMN     "problemaSuspeitoTransporte" TEXT[];

-- DropTable
DROP TABLE "Problems";
