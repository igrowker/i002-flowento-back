-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'imagen sin definir',
ALTER COLUMN "phone" SET DEFAULT '5555-555555',
ALTER COLUMN "gender" SET DEFAULT 'no definido',
ALTER COLUMN "country" SET DEFAULT 'no definido',
ALTER COLUMN "birthDate" SET DEFAULT '2024-01-01';
