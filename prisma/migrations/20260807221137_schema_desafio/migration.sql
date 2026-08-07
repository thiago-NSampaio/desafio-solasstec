-- CreateTable
CREATE TABLE "types_prioritys" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "priority_level" INTEGER NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "types_prioritys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "photo" TEXT,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priorityLevelId" INTEGER,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "availability" JSONB NOT NULL,
    "capacity" INTEGER NOT NULL,
    "capacityVariation" INTEGER,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedulings" (
    "id" SERIAL NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "roomId" INTEGER,
    "dateScheduled" TIMESTAMP(3) NOT NULL,
    "status" INTEGER DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedulings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrys" (
    "id" SERIAL NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "roomId" INTEGER,
    "schedulingId" INTEGER,
    "enteredAt" TIMESTAMP(3),
    "exitedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entrys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsibles_rooms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roomId" INTEGER,
    "valid_from" DATE NOT NULL,
    "valid_to" DATE,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responsibles_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holidays" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "type" INTEGER,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "holidays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitors_document_key" ON "visitors"("document");

-- CreateIndex
CREATE INDEX "visitors_document_idx" ON "visitors"("document");

-- CreateIndex
CREATE UNIQUE INDEX "schedulings_dateScheduled_key" ON "schedulings"("dateScheduled");

-- CreateIndex
CREATE INDEX "schedulings_dateScheduled_idx" ON "schedulings"("dateScheduled");

-- CreateIndex
CREATE UNIQUE INDEX "holidays_date_key" ON "holidays"("date");

-- CreateIndex
CREATE INDEX "holidays_date_idx" ON "holidays"("date");

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_priorityLevelId_fkey" FOREIGN KEY ("priorityLevelId") REFERENCES "types_prioritys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "visitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedulings" ADD CONSTRAINT "schedulings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrys" ADD CONSTRAINT "entrys_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrys" ADD CONSTRAINT "entrys_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrys" ADD CONSTRAINT "entrys_schedulingId_fkey" FOREIGN KEY ("schedulingId") REFERENCES "schedulings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsibles_rooms" ADD CONSTRAINT "responsibles_rooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
