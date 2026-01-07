/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company_Notifications_History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `In_Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invitations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job_Applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job_Hiring_History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Notifications_History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('EQUITY', 'ROYALTY', 'DEBT');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('PENDING', 'COUNTER_OFFER', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MembershipModel" AS ENUM ('FIXED_FEE', 'PLATFORM_EQUITY');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'EXTREME');

-- DropForeignKey
ALTER TABLE "Company_Notifications_History" DROP CONSTRAINT "Company_Notifications_History_Company_id_fkey";

-- DropForeignKey
ALTER TABLE "In_Chat" DROP CONSTRAINT "In_Chat_Company_id_fkey";

-- DropForeignKey
ALTER TABLE "In_Chat" DROP CONSTRAINT "In_Chat_User_id_fkey";

-- DropForeignKey
ALTER TABLE "Invitations" DROP CONSTRAINT "Invitations_Company_id_fkey";

-- DropForeignKey
ALTER TABLE "Invitations" DROP CONSTRAINT "Invitations_User_id_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_Company_id_fkey";

-- DropForeignKey
ALTER TABLE "JobSkill" DROP CONSTRAINT "JobSkill_Job_id_fkey";

-- DropForeignKey
ALTER TABLE "Job_Applications" DROP CONSTRAINT "Job_Applications_Job_id_fkey";

-- DropForeignKey
ALTER TABLE "Job_Applications" DROP CONSTRAINT "Job_Applications_User_id_fkey";

-- DropForeignKey
ALTER TABLE "Job_Hiring_History" DROP CONSTRAINT "Job_Hiring_History_Company_id_fkey";

-- DropForeignKey
ALTER TABLE "Job_Hiring_History" DROP CONSTRAINT "Job_Hiring_History_User_id_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_Company_id_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_Company_id_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_ConversationId_fkey";

-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_User_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Experience" DROP CONSTRAINT "User_Experience_User_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Notifications_History" DROP CONSTRAINT "User_Notifications_History_User_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Skills" DROP CONSTRAINT "User_Skills_User_id_fkey";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Company_Notifications_History";

-- DropTable
DROP TABLE "In_Chat";

-- DropTable
DROP TABLE "Invitations";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "JobSkill";

-- DropTable
DROP TABLE "Job_Applications";

-- DropTable
DROP TABLE "Job_Hiring_History";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "Messages";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "User_Experience";

-- DropTable
DROP TABLE "User_Notifications_History";

-- DropTable
DROP TABLE "User_Skills";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- DropEnum
DROP TYPE "NotificationStatus";

-- DropEnum
DROP TYPE "SenderType";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "Startup" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "founderName" TEXT NOT NULL,
    "phone" TEXT,
    "websiteUrl" TEXT,
    "linkedinUrl" TEXT,
    "logoUrl" TEXT,
    "sector" TEXT,
    "numFounders" INTEGER NOT NULL DEFAULT 1,
    "hasTechnicalFounder" BOOLEAN NOT NULL DEFAULT false,
    "experienceYears" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "monthlyUsers" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "pitchDeckUrl" TEXT,
    "videoPitchUrl" TEXT,
    "cnrcUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "membershipType" "MembershipModel" NOT NULL DEFAULT 'FIXED_FEE',
    "hasPaidFee" BOOLEAN NOT NULL DEFAULT false,
    "platformEquityGiven" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "biography" TEXT,
    "sectors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialRecord" (
    "id" SERIAL NOT NULL,
    "startupId" INTEGER NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "revenue" DECIMAL(15,2) NOT NULL,
    "costs" DECIMAL(15,2) NOT NULL,
    "proofDocumentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinancialRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingRequest" (
    "id" SERIAL NOT NULL,
    "startupId" INTEGER NOT NULL,
    "amountRequested" DECIMAL(15,2) NOT NULL,
    "equityOffered" DECIMAL(5,2),
    "offerType" "OfferType" NOT NULL DEFAULT 'EQUITY',
    "riskScore" INTEGER,
    "riskLevel" "RiskLevel",
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentOffer" (
    "id" SERIAL NOT NULL,
    "investorId" INTEGER NOT NULL,
    "fundingRequestId" INTEGER NOT NULL,
    "proposedAmount" DECIMAL(15,2) NOT NULL,
    "proposedEquity" DECIMAL(5,2),
    "status" "OfferStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvestmentOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" SERIAL NOT NULL,
    "investorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DECIMAL(65,30),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Startup_email_key" ON "Startup"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_email_key" ON "Investor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentOffer_investorId_fundingRequestId_key" ON "InvestmentOffer"("investorId", "fundingRequestId");

-- AddForeignKey
ALTER TABLE "FinancialRecord" ADD CONSTRAINT "FinancialRecord_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingRequest" ADD CONSTRAINT "FundingRequest_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentOffer" ADD CONSTRAINT "InvestmentOffer_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestmentOffer" ADD CONSTRAINT "InvestmentOffer_fundingRequestId_fkey" FOREIGN KEY ("fundingRequestId") REFERENCES "FundingRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_investorId_fkey" FOREIGN KEY ("investorId") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
