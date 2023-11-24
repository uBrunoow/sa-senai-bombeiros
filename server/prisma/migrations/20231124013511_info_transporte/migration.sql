-- CreateEnum
CREATE TYPE "Code" AS ENUM ('IR', 'PS');

-- CreateTable
CREATE TABLE "InfoTransporte" (
    "id" SERIAL NOT NULL,
    "numberUSB" INTEGER,
    "numberOcorr" INTEGER,
    "forwardingAgent" TEXT,
    "HcH" TEXT,
    "kmFinal" INTEGER,
    "code" "Code" NOT NULL,
    "codeSUS" INTEGER,
    "ReportOwnerId" INTEGER NOT NULL,

    CONSTRAINT "InfoTransporte_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InfoTransporte" ADD CONSTRAINT "InfoTransporte_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
