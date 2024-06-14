-- CreateTable
CREATE TABLE "Survey" (
    "id" TEXT NOT NULL,
    "nicheId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "nicheAnswers" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Niche" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "Niche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NicheQuestion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "niches" TEXT[],
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),

    CONSTRAINT "NicheQuestion_pkey" PRIMARY KEY ("id")
);

-- Insert Initial Data into Niche
INSERT INTO "Niche" ("id", "key", "name", "created", "deleted") VALUES
    (gen_random_uuid(), 'GEEKS', 'Geeks', CURRENT_TIMESTAMP, NULL),
    (gen_random_uuid(), 'MINIMALS', 'Minimals', CURRENT_TIMESTAMP, NULL),
    (gen_random_uuid(), 'ATLETES', 'Atletes', CURRENT_TIMESTAMP, NULL);
