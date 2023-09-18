-- CreateTable
CREATE TABLE "Glasglow" (
    "id" SERIAL NOT NULL,
    "ReportOwnerId" INTEGER NOT NULL,
    "eyeOpeningOwnerId" INTEGER NOT NULL,
    "verbalResponseOwnerId" INTEGER NOT NULL,
    "motorResponseOwnerId" INTEGER NOT NULL,

    CONSTRAINT "Glasglow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Glasglow" ADD CONSTRAINT "Glasglow_ReportOwnerId_fkey" FOREIGN KEY ("ReportOwnerId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
