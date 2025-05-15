/*
  Warnings:

  - You are about to drop the column `userId` on the `Staff` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Staff_userId_key";

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "userId";
