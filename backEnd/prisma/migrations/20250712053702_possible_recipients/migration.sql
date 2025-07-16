-- AlterTable
ALTER TABLE "donationPost" ADD COLUMN     "possibleRecipients" JSONB[];

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "donationsReceived" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastDonationReceived" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "numTimesDonated" INTEGER NOT NULL DEFAULT 0;
