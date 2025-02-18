/*
  Warnings:

  - Made the column `name` on table `Bookings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
