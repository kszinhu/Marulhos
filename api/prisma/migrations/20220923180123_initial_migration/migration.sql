-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F', 'X');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "rg" TEXT,
    "sex" "Sex" NOT NULL,
    "birth_date" TIMESTAMP(3),
    "address_cep" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pilot" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "rg" TEXT,
    "sex" "Sex" NOT NULL,
    "birth_date" TIMESTAMP(3),
    "address_cep" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "vaccination_number" INTEGER NOT NULL,
    "passport_number" INTEGER NOT NULL,
    "work_registration_number" INTEGER NOT NULL,
    "pilot_license_number" INTEGER NOT NULL,

    CONSTRAINT "Pilot_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Fly_Attendant" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "rg" TEXT,
    "sex" "Sex" NOT NULL,
    "birth_date" TIMESTAMP(3),
    "address_cep" TEXT NOT NULL,
    "address_number" TEXT NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,
    "vaccination_number" INTEGER NOT NULL,
    "passport_number" INTEGER NOT NULL,
    "work_registration_number" INTEGER NOT NULL,

    CONSTRAINT "Fly_Attendant_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Terminal" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Terminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "estimated_departure_date" TIMESTAMP(3) NOT NULL,
    "estimated_arrival_date" TIMESTAMP(3) NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight_Instance" (
    "id" SERIAL NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "arrival_date" TIMESTAMP(3) NOT NULL,
    "flight_id" INTEGER NOT NULL,
    "plane_id" INTEGER NOT NULL,
    "terminal_id" INTEGER NOT NULL,
    "pilot_cpf" TEXT NOT NULL,
    "copilot_cpf" TEXT NOT NULL,

    CONSTRAINT "Flight_Instance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "passenger_id" INTEGER NOT NULL,
    "flight_instance_id" INTEGER,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "number_of_planes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "Plane" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "manufacture_date" TIMESTAMP(3),
    "company_cnpj" TEXT NOT NULL,

    CONSTRAINT "Plane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Flight_InstanceToFly_Attendant" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Pilot_vaccination_number_key" ON "Pilot"("vaccination_number");

-- CreateIndex
CREATE UNIQUE INDEX "Pilot_passport_number_key" ON "Pilot"("passport_number");

-- CreateIndex
CREATE UNIQUE INDEX "Pilot_work_registration_number_key" ON "Pilot"("work_registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "Pilot_pilot_license_number_key" ON "Pilot"("pilot_license_number");

-- CreateIndex
CREATE UNIQUE INDEX "Fly_Attendant_vaccination_number_key" ON "Fly_Attendant"("vaccination_number");

-- CreateIndex
CREATE UNIQUE INDEX "Fly_Attendant_passport_number_key" ON "Fly_Attendant"("passport_number");

-- CreateIndex
CREATE UNIQUE INDEX "Fly_Attendant_work_registration_number_key" ON "Fly_Attendant"("work_registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_Instance_flight_id_key" ON "Flight_Instance"("flight_id");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_Flight_InstanceToFly_Attendant_AB_unique" ON "_Flight_InstanceToFly_Attendant"("A", "B");

-- CreateIndex
CREATE INDEX "_Flight_InstanceToFly_Attendant_B_index" ON "_Flight_InstanceToFly_Attendant"("B");

-- AddForeignKey
ALTER TABLE "Flight_Instance" ADD CONSTRAINT "Flight_Instance_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_Instance" ADD CONSTRAINT "Flight_Instance_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_Instance" ADD CONSTRAINT "Flight_Instance_copilot_cpf_fkey" FOREIGN KEY ("copilot_cpf") REFERENCES "Pilot"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_Instance" ADD CONSTRAINT "Flight_Instance_pilot_cpf_fkey" FOREIGN KEY ("pilot_cpf") REFERENCES "Pilot"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight_Instance" ADD CONSTRAINT "Flight_Instance_plane_id_fkey" FOREIGN KEY ("plane_id") REFERENCES "Plane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_flight_instance_id_fkey" FOREIGN KEY ("flight_instance_id") REFERENCES "Flight_Instance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plane" ADD CONSTRAINT "Plane_company_cnpj_fkey" FOREIGN KEY ("company_cnpj") REFERENCES "Company"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Flight_InstanceToFly_Attendant" ADD CONSTRAINT "_Flight_InstanceToFly_Attendant_A_fkey" FOREIGN KEY ("A") REFERENCES "Flight_Instance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Flight_InstanceToFly_Attendant" ADD CONSTRAINT "_Flight_InstanceToFly_Attendant_B_fkey" FOREIGN KEY ("B") REFERENCES "Fly_Attendant"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;
