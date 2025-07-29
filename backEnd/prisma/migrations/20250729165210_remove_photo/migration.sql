/*
  Warnings:

  - You are about to drop the column `photo` on the `donationPost` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `requestPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "donationPost" DROP COLUMN "photo";

-- AlterTable
ALTER TABLE "requestPost" DROP COLUMN "photo";
