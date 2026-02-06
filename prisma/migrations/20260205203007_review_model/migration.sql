-- CreateTable
CREATE TABLE "UserReviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teachingsessionId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "opinion" TEXT NOT NULL DEFAULT 'N/A',

    CONSTRAINT "UserReviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserReviews" ADD CONSTRAINT "UserReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReviews" ADD CONSTRAINT "UserReviews_teachingsessionId_fkey" FOREIGN KEY ("teachingsessionId") REFERENCES "teachingsession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
