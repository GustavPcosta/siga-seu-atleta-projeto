-- CreateTable
CREATE TABLE "Sport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paralympic" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Athlete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sportId" INTEGER NOT NULL,
    "paralympic" BOOLEAN NOT NULL,
    "instagramUrl" TEXT,
    "instagramName" TEXT,
    "instagramImageUrl" TEXT,
    "instagramFollowersCount" INTEGER,
    "instagramFollowingCount" INTEGER,
    "instagramPostsCount" INTEGER,
    "instagramBio" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Athlete_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Sport_code_key" ON "Sport"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Sport_name_key" ON "Sport"("name");
