-- CreateEnum
CREATE TYPE "TProcedimentoEfetuadoOnlyName" AS ENUM ('ASPIRACAO', 'AVALIACAO_INICIAL', 'AVALIACAO_DIRIGIDA', 'AVALIACAO_CONTINUADA', 'CHAVE_DE_RAUTEK', 'CANULA_DE_GUEDEL', 'DESOBSTRUCAO_DE_VA', 'EMPREGO_DO_DEA', 'GERENCIAMENTO_DE_RISCOS', 'LIMPEZA_DE_FERIMENTO', 'CURATIVOS', 'COMPRESSIVO', 'ENCRAVAMENTO', 'OCULAR', 'QUEIMADURA', 'SIMPLES', 'THREE_PONTAS', 'IMOBILIZACOES', 'MEMBRO_INF_DIR', 'MEMBRO_INF_ESQ', 'MEMBRO_SUP_DIR', 'MEMBRO_SUP_ESQ', 'QUADRIL', 'CERVICAL', 'MACA_SOBRE_RODAS', 'MACA_RIGIDA', 'PONTE', 'RETIRADO_CAPACETE', 'RCP', 'ROLAMENTO_90', 'ROLAMENTO_180', 'TOMADA_DECISAO', 'TRATADO_CHOQUE', 'USO_DE_CANULA', 'USO_KED', 'USO_TTF', 'VENTILACAO_SUPORTE', 'MEIOS_AUXILIARES', 'CELESC', 'DEF_CIVIL', 'IGP_PC', 'CIT', 'ANOTHER');

-- CreateEnum
CREATE TYPE "TProcedimentoEfetuadoOnlySize" AS ENUM ('USO_COLAR_TAM');

-- CreateEnum
CREATE TYPE "TProcedimentoEfetuadoOnlyLPM" AS ENUM ('OXIGENOTERAPIA', 'REANIMADOR');

-- CreateEnum
CREATE TYPE "TProcedimentoEfetuadoOnlyOptions" AS ENUM ('SAMU', 'POLICIA');

-- CreateEnum
CREATE TYPE "MateriaisDescartaveisNamesWithSizes" AS ENUM ('ATADURAS', 'KITS', 'LUVAS_DESC_PARES', 'TALAS_PAP');

-- CreateEnum
CREATE TYPE "MateriaisDescartaveisNamesWithoutSizes" AS ENUM ('CATETER_TP_OCULOS', 'COMPRESSORA_COMUM', 'MASCARA_DESC', 'MANTA_ALUMINIZADA', 'PAS_DO_DEA', 'SONDA_DE_ASPIRACAO', 'SORO_FISIOLOGICO');

-- CreateEnum
CREATE TYPE "MateriaisHospitalNamesWithSizes" AS ENUM ('COLAR', 'KED', 'TTF');

-- CreateEnum
CREATE TYPE "MateriaisHospitalNamesWithoutSizes" AS ENUM ('BASE_DO_ESTABILIZA', 'COXINS_ESTABILIZA', 'MACA_RIGIDA', 'TIRANTE_ARANHA', 'TIRANTE_DE_CABECA', 'CANULA');

-- CreateTable
CREATE TABLE "InfosHospitalares" (
    "id" SERIAL NOT NULL,
    "Doctor" TEXT,
    "S1" TEXT,
    "S2" TEXT,
    "S3" TEXT,
    "Demandant" TEXT,
    "TeamUp" TEXT,
    "reportId" INTEGER,

    CONSTRAINT "InfosHospitalares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedimentoEfetuados" (
    "id" SERIAL NOT NULL,
    "infosHospitalaresId" INTEGER,

    CONSTRAINT "ProcedimentoEfetuados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedimentosEfetuadosOnlyName" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "TProcedimentoEfetuadoOnlyName",
    "infosHospitalaresId" INTEGER,
    "procedimentoEfetuadosId" INTEGER,

    CONSTRAINT "ProcedimentosEfetuadosOnlyName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedimentosEfetuadosOnlySize" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "TProcedimentoEfetuadoOnlySize",
    "sizes" TEXT,
    "infosHospitalaresId" INTEGER,
    "procedimentoEfetuadosId" INTEGER,

    CONSTRAINT "ProcedimentosEfetuadosOnlySize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedimentosEfetuadosOnlyLPM" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "TProcedimentoEfetuadoOnlyLPM",
    "LPM" INTEGER,
    "infosHospitalaresId" INTEGER,
    "procedimentoEfetuadosId" INTEGER,

    CONSTRAINT "ProcedimentosEfetuadosOnlyLPM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcedimentosEfetuadosOnlyOptions" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "TProcedimentoEfetuadoOnlyOptions",
    "infosHospitalaresId" INTEGER,
    "procedimentoEfetuadosId" INTEGER,

    CONSTRAINT "ProcedimentosEfetuadosOnlyOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "option" TEXT,
    "procedimentoId" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaisDescartaveis" (
    "id" SERIAL NOT NULL,
    "infosHospitalaresId" INTEGER,

    CONSTRAINT "MateriaisDescartaveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaisDescartaveisWithoutSizes" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "MateriaisDescartaveisNamesWithoutSizes",
    "quantity" INTEGER,
    "materiaisDescartaveisId" INTEGER,

    CONSTRAINT "MateriaisDescartaveisWithoutSizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaisDescartaveisWithSizes" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "MateriaisDescartaveisNamesWithSizes",
    "quantity" INTEGER,
    "materiaisDescartaveisId" INTEGER,

    CONSTRAINT "MateriaisDescartaveisWithSizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sizes" (
    "id" SERIAL NOT NULL,
    "selectedSize" TEXT,
    "entries" TEXT[] DEFAULT ARRAY[' ']::TEXT[],
    "materiaisDescartaveisWithSizesId" INTEGER,

    CONSTRAINT "Sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaisDeixadosNoHospital" (
    "id" SERIAL NOT NULL,
    "infosHospitalaresId" INTEGER,

    CONSTRAINT "MateriaisDeixadosNoHospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaisDeixadosNoHospitalWithoutSizes" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "MateriaisHospitalNamesWithoutSizes",
    "quantity" INTEGER,
    "materiaisDeixadosNoHospitalId" INTEGER,

    CONSTRAINT "MateriaisDeixadosNoHospitalWithoutSizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaisDeixadosNoHospitalWithSizes" (
    "id" SERIAL NOT NULL,
    "state" BOOLEAN,
    "name" "MateriaisHospitalNamesWithSizes",
    "quantity" INTEGER,
    "materiaisDeixadosNoHospitalId" INTEGER,

    CONSTRAINT "MateriaisDeixadosNoHospitalWithSizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MSizes" (
    "id" SERIAL NOT NULL,
    "selectedSize" TEXT,
    "entries" TEXT[],
    "materiaisDeixadosNoHospitalWithSizesId" INTEGER,

    CONSTRAINT "MSizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InfosHospitalares" ADD CONSTRAINT "InfosHospitalares_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedimentoEfetuados" ADD CONSTRAINT "ProcedimentoEfetuados_infosHospitalaresId_fkey" FOREIGN KEY ("infosHospitalaresId") REFERENCES "InfosHospitalares"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlyName" ADD CONSTRAINT "ProcedimentosEfetuadosOnlyName_procedimentoEfetuadosId_fkey" FOREIGN KEY ("procedimentoEfetuadosId") REFERENCES "ProcedimentoEfetuados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlySize" ADD CONSTRAINT "ProcedimentosEfetuadosOnlySize_procedimentoEfetuadosId_fkey" FOREIGN KEY ("procedimentoEfetuadosId") REFERENCES "ProcedimentoEfetuados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlyLPM" ADD CONSTRAINT "ProcedimentosEfetuadosOnlyLPM_procedimentoEfetuadosId_fkey" FOREIGN KEY ("procedimentoEfetuadosId") REFERENCES "ProcedimentoEfetuados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcedimentosEfetuadosOnlyOptions" ADD CONSTRAINT "ProcedimentosEfetuadosOnlyOptions_procedimentoEfetuadosId_fkey" FOREIGN KEY ("procedimentoEfetuadosId") REFERENCES "ProcedimentoEfetuados"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_procedimentoId_fkey" FOREIGN KEY ("procedimentoId") REFERENCES "ProcedimentosEfetuadosOnlyOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisDescartaveis" ADD CONSTRAINT "MateriaisDescartaveis_infosHospitalaresId_fkey" FOREIGN KEY ("infosHospitalaresId") REFERENCES "InfosHospitalares"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisDescartaveisWithoutSizes" ADD CONSTRAINT "MateriaisDescartaveisWithoutSizes_materiaisDescartaveisId_fkey" FOREIGN KEY ("materiaisDescartaveisId") REFERENCES "MateriaisDescartaveis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisDescartaveisWithSizes" ADD CONSTRAINT "MateriaisDescartaveisWithSizes_materiaisDescartaveisId_fkey" FOREIGN KEY ("materiaisDescartaveisId") REFERENCES "MateriaisDescartaveis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sizes" ADD CONSTRAINT "Sizes_materiaisDescartaveisWithSizesId_fkey" FOREIGN KEY ("materiaisDescartaveisWithSizesId") REFERENCES "MateriaisDescartaveisWithSizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisDeixadosNoHospital" ADD CONSTRAINT "MateriaisDeixadosNoHospital_infosHospitalaresId_fkey" FOREIGN KEY ("infosHospitalaresId") REFERENCES "InfosHospitalares"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisDeixadosNoHospitalWithoutSizes" ADD CONSTRAINT "MateriaisDeixadosNoHospitalWithoutSizes_materiaisDeixadosN_fkey" FOREIGN KEY ("materiaisDeixadosNoHospitalId") REFERENCES "MateriaisDeixadosNoHospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaisDeixadosNoHospitalWithSizes" ADD CONSTRAINT "MateriaisDeixadosNoHospitalWithSizes_materiaisDeixadosNoHo_fkey" FOREIGN KEY ("materiaisDeixadosNoHospitalId") REFERENCES "MateriaisDeixadosNoHospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MSizes" ADD CONSTRAINT "MSizes_materiaisDeixadosNoHospitalWithSizesId_fkey" FOREIGN KEY ("materiaisDeixadosNoHospitalWithSizesId") REFERENCES "MateriaisDeixadosNoHospitalWithSizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
