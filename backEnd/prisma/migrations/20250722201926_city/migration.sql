/*
  Warnings:

  - You are about to drop the column `name` on the `area` table. All the data in the column will be lost.
  - Added the required column `city` to the `area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "area" DROP COLUMN "name",
ADD COLUMN     "city" TEXT NOT NULL;
