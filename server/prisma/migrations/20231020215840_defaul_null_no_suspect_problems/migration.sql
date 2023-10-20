-- AlterTable
ALTER TABLE "Glasglow" ALTER COLUMN "eyeOpeningOwnerId" DROP NOT NULL,
ALTER COLUMN "verbalResponseOwnerId" DROP NOT NULL,
ALTER COLUMN "motorResponseOwnerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SuspectProblems" ALTER COLUMN "problemaSuspeitoTransporte" SET DEFAULT ARRAY['null']::TEXT[],
ALTER COLUMN "problemaSuspeitoDiabetes" SET DEFAULT ARRAY['null']::TEXT[],
ALTER COLUMN "problemaSuspeitoObstetrico" SET DEFAULT ARRAY['null']::TEXT[],
ALTER COLUMN "problemaSuspeitoRespiratorio" SET DEFAULT ARRAY['null']::TEXT[],
ALTER COLUMN "Another" DROP NOT NULL;
