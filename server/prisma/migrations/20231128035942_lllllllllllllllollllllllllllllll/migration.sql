/*
  Warnings:

  - You are about to drop the `MSizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MateriaisDeixadosNoHospitalWithSizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MateriaisDeixadosNoHospitalWithoutSizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MateriaisDescartaveisWithSizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MateriaisDescartaveisWithoutSizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MateriaisDescartaveisNames" AS ENUM ('ATADURAS', 'KITS', 'LUVAS_DESC_PARES', 'TALAS_PAP', 'CATETER_TP_OCULOS', 'COMPRESSORA_COMUM', 'MASCARA_DESC', 'MANTA_ALUMINIZADA', 'PAS_DO_DEA', 'SONDA_DE_ASPIRACAO', 'SORO_FISIOLOGICO');

-- CreateEnum
CREATE TYPE "MateriaisHospitalNames" AS ENUM ('COLAR', 'KED', 'TTF', 'BASE_DO_ESTABILIZA', 'COXINS_ESTABILIZA', 'MACA_RIGIDA', 'TIRANTE_ARANHA', 'TIRANTE_DE_CABECA', 'CANULA');

-- DropForeignKey
ALTER TABLE "MSizes" DROP CONSTRAINT "MSizes_materiaisDeixadosNoHospitalWithSizesId_fkey";

-- DropForeignKey
ALTER TABLE "MateriaisDeixadosNoHospitalWithSizes" DROP CONSTRAINT "MateriaisDeixadosNoHospitalWithSizes_materiaisDeixadosNoHo_fkey";

-- DropForeignKey
ALTER TABLE "MateriaisDeixadosNoHospitalWithoutSizes" DROP CONSTRAINT "MateriaisDeixadosNoHospitalWithoutSizes_materiaisDeixadosN_fkey";

-- DropForeignKey
ALTER TABLE "MateriaisDescartaveisWithSizes" DROP CONSTRAINT "MateriaisDescartaveisWithSizes_materiaisDescartaveisId_fkey";

-- DropForeignKey
ALTER TABLE "MateriaisDescartaveisWithoutSizes" DROP CONSTRAINT "MateriaisDescartaveisWithoutSizes_materiaisDescartaveisId_fkey";

-- DropForeignKey
ALTER TABLE "Sizes" DROP CONSTRAINT "Sizes_materiaisDescartaveisWithSizesId_fkey";

-- AlterTable
ALTER TABLE "MateriaisDeixadosNoHospital" ADD COLUMN     "name" "MateriaisHospitalNames",
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "state" BOOLEAN;

-- AlterTable
ALTER TABLE "MateriaisDescartaveis" ADD COLUMN     "name" "MateriaisDescartaveisNames",
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "sizes" TEXT[],
ADD COLUMN     "state" BOOLEAN;

-- DropTable
DROP TABLE "MSizes";

-- DropTable
DROP TABLE "MateriaisDeixadosNoHospitalWithSizes";

-- DropTable
DROP TABLE "MateriaisDeixadosNoHospitalWithoutSizes";

-- DropTable
DROP TABLE "MateriaisDescartaveisWithSizes";

-- DropTable
DROP TABLE "MateriaisDescartaveisWithoutSizes";

-- DropTable
DROP TABLE "Sizes";

-- DropEnum
DROP TYPE "MateriaisDescartaveisNamesWithSizes";

-- DropEnum
DROP TYPE "MateriaisDescartaveisNamesWithoutSizes";

-- DropEnum
DROP TYPE "MateriaisHospitalNamesWithSizes";

-- DropEnum
DROP TYPE "MateriaisHospitalNamesWithoutSizes";
