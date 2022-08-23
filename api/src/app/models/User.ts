import { Prisma, Ticket, Sex } from "@prisma/client";
import { prisma } from "../lib/Prisma.js";

export default class User {
  static async all() {
    return await prisma.user.findMany({
      include: {
        tickets: true,
      },
    });
  }

  static async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  }

  static async get(cpf: string) {
    return await prisma.user.findFirst({
      where: {
        cpf,
      },
      include: {
        tickets: true,
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
      tickets,
    }: {
      name: string;
      last_name: string;
      rg: string | null;
      sex: Sex;
      birth_date: Date | null;
      address_cep: string;
      address_number: string;
      tickets: Ticket[];
    }
  ) {
    return await prisma.user.update({
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
        tickets: {
          connectOrCreate: tickets.map((ticket) => ({
            where: { id: ticket.id },
            create: { ...ticket },
          })),
        },
      },
      include: {
        tickets: true,
      },
    });
  }

  static async delete(cpf: string) {
    return await prisma.user.delete({
      where: {
        cpf,
      },
    });
  }
}
