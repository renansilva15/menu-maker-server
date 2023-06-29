/*
  Warnings:

  - You are about to drop the `_ManagerToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_managerId_fkey";

-- DropForeignKey
ALTER TABLE "_ManagerToUser" DROP CONSTRAINT "_ManagerToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ManagerToUser" DROP CONSTRAINT "_ManagerToUser_B_fkey";

-- DropTable
DROP TABLE "_ManagerToUser";
