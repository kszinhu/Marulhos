import { Prisma, Sex, Flight_Instance } from "@prisma/client";
import { prisma } from "../lib/Prisma.js";

export default class FlyAttendant {
  static async all() {
    return await prisma.fly_Attendant.findMany({
      include: {
        flights: true,
      },
    });
  }

  static async create(data: Prisma.Fly_AttendantCreateInput) {
    return await prisma.fly_Attendant.create({
      data,
    });
  }

  static async get(cpf: string) {
    return await prisma.fly_Attendant.findFirst({
      where: {
        cpf,
      },
      include: {
        flights: true,
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
      flights,
    }: {
      name: string;
      last_name: string;
      rg: string | null;
      sex: Sex;
      birth_date: Date | null;
      address_cep: string;
      address_number: string;
      flights: Flight_Instance[];
    }
  ) {
    return await prisma.fly_Attendant.update({
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
        flights: {
          connectOrCreate: flights.map((flight) => ({
            where: { id: flight.id },
            create: { ...flight },
          })),
        },
      },
      include: {
        flights: true,
      },
    });
  }

  static async delete(cpf: string) {
    return await prisma.fly_Attendant.delete({
      where: {
        cpf,
      },
    });
  }
}
