/*
  Warnings:

  - Added the required column `numberOfTables` to the `Manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "numberOfTables" INTEGER NOT NULL;
