/*
  Warnings:

  - You are about to drop the column `description` on the `PreHospitalMethod` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "preHospitalarMethodDescription" AS ENUM ('AFOGAMENTO', 'AGRESSAO', 'ATROPELAMENTO', 'CAUSADO_POR_ANIMAIS', 'CHOQUE_ELETRICO', 'COM_MEIO_DE_TRANSPORTE', 'DESABAMENTO', 'DESMORONAMENTO', 'DOMESTICO', 'EMERGENCIA_MEDICA', 'ESPORTIVO', 'INTOXICACAO', 'QUEDA_BICICLETA', 'QUEDA_MOTO', 'QUEDA_MENOR_QUE_2M', 'QUEDA_MAIOR_QUE_2M', 'QUEDA_PROPRIA_ALTURA', 'TENTATIVA_DE_SUICIDIO', 'TRABALHO', 'TRANSFERENCIA');

-- AlterTable
ALTER TABLE "PreHospitalMethod" DROP COLUMN "description",
ADD COLUMN     "preHospitalarMethodDescription" TEXT[] DEFAULT ARRAY['']::TEXT[];
