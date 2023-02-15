-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "order" SET DEFAULT 5;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "order" INTEGER DEFAULT 5;

-- AlterTable
ALTER TABLE "Target" ADD COLUMN     "order" INTEGER DEFAULT 5;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "order" INTEGER DEFAULT 5;
