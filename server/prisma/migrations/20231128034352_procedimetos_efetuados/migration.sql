/*
  Warnings:

  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcedimentosEfetuadosOnlyLPM` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcedimentosEfetuadosOnlyName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcedimentosEfetuadosOnlyOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcedimentosEfetuadosOnlySize` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TProcedimentoEfetuadoName" AS ENUM ('ASPIRACAO', 'AVALIACAO_INICIAL', 'AVALIACAO_DIRIGIDA', 'AVALIACAO_CONTINUADA', 'CHAVE_DE_RAUTEK', 'CANULA_DE_GUEDEL', 'DESOBSTRUCAO_DE_VA', 'EMPREGO_DO_DEA', 'GERENCIAMENTO_DE_RISCOS', 'LIMPEZA_DE_FERIMENTO', 'CURATIVOS', 'COMPRESSIVO', 'ENCRAVAMENTO', 'OCULAR', 'QUEIMADURA', 'SIMPLES', 'THREE_PONTAS', 'IMOBILIZACOES', 'MEMBRO_INF_DIR', 'MEMBRO_INF_ESQ', 'MEMBRO_SUP_DIR', 'MEMBRO_SUP_ESQ', 'QUADRIL', 'CERVICAL', 'MACA_SOBRE_RODAS', 'MACA_RIGIDA', 'PONTE', 'RETIRADO_CAPACETE', 'RCP', 'ROLAMENTO_90', 'ROLAMENTO_180', 'TOMADA_DECISAO', 'TRATADO_CHOQUE', 'USO_DE_CANULA', 'USO_KED', 'USO_TTF', 'VENTILACAO_SUPORTE', 'MEIOS_AUXILIARES', 'CELESC', 'DEF_CIVIL', 'IGP_PC', 'CIT', 'ANOTHER', 'USO_COLAR_TAM', 'OXIGENOTERAPIA', 'REANIMADOR', 'SAMU', 'POLICIA');

-- DropForeignKey
ALTER TABLE "InfosHospitalares" DROP CONSTRAINT "InfosHospitalares_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_procedimentoId_fkey";

-- DropForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlyLPM" DROP CONSTRAINT "ProcedimentosEfetuadosOnlyLPM_procedimentoEfetuadosId_fkey";

-- DropForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlyName" DROP CONSTRAINT "ProcedimentosEfetuadosOnlyName_procedimentoEfetuadosId_fkey";

-- DropForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlyOptions" DROP CONSTRAINT "ProcedimentosEfetuadosOnlyOptions_procedimentoEfetuadosId_fkey";

-- DropForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlySize" DROP CONSTRAINT "ProcedimentosEfetuadosOnlySize_procedimentoEfetuadosId_fkey";

-- AlterTable
ALTER TABLE "ProcedimentoEfetuados" ADD COLUMN     "LPM" INTEGER,
ADD COLUMN     "name" "TProcedimentoEfetuadoName",
ADD COLUMN     "options" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "sizes" TEXT,
ADD COLUMN     "state" BOOLEAN;

-- DropTable
DROP TABLE "Option";

-- DropTable
DROP TABLE "ProcedimentosEfetuadosOnlyLPM";

-- DropTable
DROP TABLE "ProcedimentosEfetuadosOnlyName";

-- DropTable
DROP TABLE "ProcedimentosEfetuadosOnlyOptions";

-- DropTable
DROP TABLE "ProcedimentosEfetuadosOnlySize";

-- DropEnum
DROP TYPE "TProcedimentoEfetuadoOnlyLPM";

-- DropEnum
DROP TYPE "TProcedimentoEfetuadoOnlyName";

-- DropEnum
DROP TYPE "TProcedimentoEfetuadoOnlyOptions";

-- DropEnum
DROP TYPE "TProcedimentoEfetuadoOnlySize";

-- AddForeignKey
ALTER TABLE "InfosHospitalares" ADD CONSTRAINT "InfosHospitalares_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
