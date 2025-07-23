/*
  Warnings:

  - A unique constraint covering the columns `[city]` on the table `area` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "area_city_key" ON "area"("city");
