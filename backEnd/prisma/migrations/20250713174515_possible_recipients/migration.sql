/*
  Warnings:

  - You are about to drop the column `possibleRecipients` on the `donationPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "donationPost" DROP COLUMN "possibleRecipients";

-- CreateTable
CREATE TABLE "possibleRecipients" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "Distance" INTEGER NOT NULL,
    "wantScore" INTEGER NOT NULL,
    "donationPostId" INTEGER,

    CONSTRAINT "possibleRecipients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "possibleRecipients" ADD CONSTRAINT "possibleRecipients_donationPostId_fkey" FOREIGN KEY ("donationPostId") REFERENCES "donationPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
