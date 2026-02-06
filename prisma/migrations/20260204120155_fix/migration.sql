/*
  Warnings:

  - You are about to drop the column `fromDate` on the `teachingsession` table. All the data in the column will be lost.
  - You are about to drop the column `toDate` on the `teachingsession` table. All the data in the column will be lost.
  - Added the required column `date` to the `teachingsession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromTime` to the `teachingsession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toTime` to the `teachingsession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teachingsession" DROP COLUMN "fromDate",
DROP COLUMN "toDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fromTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "toTime" TIMESTAMP(3) NOT NULL;
