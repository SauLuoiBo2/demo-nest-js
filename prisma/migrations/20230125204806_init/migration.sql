/*
  Warnings:

  - You are about to drop the column `story` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "story",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "detail" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "fb_url" SET DEFAULT '',
ALTER COLUMN "tiktok_url" SET DEFAULT '';
