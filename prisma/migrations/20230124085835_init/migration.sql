-- AlterTable
ALTER TABLE "SecondTag" ALTER COLUMN "order" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ThirdTag" ADD COLUMN     "order" INTEGER DEFAULT 5;
