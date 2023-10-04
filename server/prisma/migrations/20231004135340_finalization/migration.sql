-- CreateTable
CREATE TABLE "Finalization" (
    "id" SERIAL NOT NULL,
    "responsable" TEXT,
    "conduction" TEXT[],
    "transportation" TEXT,
    "finalRemarks" TEXT,

    CONSTRAINT "Finalization_pkey" PRIMARY KEY ("id")
);
