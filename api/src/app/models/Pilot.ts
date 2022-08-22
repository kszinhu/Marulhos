import { Prisma } from "@prisma/client";
import { prisma } from "../lib/Prisma.js";

export default class Pilot {
  static async all() {
    return await prisma.pilot.findMany({
      include: { co_flights: true, flights: true },
    });
  }

  static async create(data: Prisma.PilotCreateInput) {
    return await prisma.pilot.create({
      data,
    });
  }

  static async get(cpf: string) {
    return await prisma.pilot.findFirst({
      where: {
        cpf,
      },
      include: {
        flights: true,
        co_flights: true,
      },
    });
  }

  static async save(
    cpf: string,
    {
      name,
      last_name,
      rg,
      sex,
      birth_date,
      address_cep,
      address_number,
      salary,
      vaccination_number,
      work_registration_number,
      pilot_license_number,
      passport_number,
      flights,
      co_flights,
    }: any
  ) {
    return await prisma.pilot.update({
      where: {
        cpf,
      },
      data: {
        name,
        last_name,
        rg,
        sex,
        birth_date,
        address_cep,
        address_number,
        salary,
        passport_number,
        vaccination_number,
        work_registration_number,
        pilot_license_number,
        flights: {
          createMany: {
            data:
              flights &&
              flights.map(({ ...flight }) => ({
                ...flight,
              })),
          },
        },
        co_flights: {
          createMany: {
            data:
              co_flights &&
              co_flights.map(({ ...flight }) => ({
                ...flight,
              })),
          },
        },
      },
    });
  }

  static async delete(cpf: string) {
    return await prisma.pilot.delete({
      where: {
        cpf,
      },
    });
  }
}
