import { Prisma, Flight_Instance, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/index.js";
import { prisma } from "../lib/Prisma.js";

export default class Ticket {
  static async all() {
    return await prisma.ticket.findMany({
      include: {
        flight_instance: {
          select: {
            flight_id: true,
            departure_date: true,
            arrival_date: true,
            terminal_id: true,
            plane_id: true,
          },
        },
        user: {
          select: {
            cpf: true,
            name: true,
            last_name: true,
            sex: true,
            birth_date: true,
          },
        },
      },
    });
  }

  static async create(data: Prisma.TicketCreateInput) {
    return await prisma.ticket.create({
      data: {
        ...data,
        user: {
          connect: {
            //@ts-ignore
            cpf: data.user.cpf,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }

  static async get(id: number) {
    return await prisma.ticket.findFirst({
      where: {
        id,
      },
      include: {
        flight_instance: true,
        user: true,
      },
    });
  }

  static async save(
    id: number,
    {
      price,
      flight_instance,
      user,
    }: {
      price: Decimal;
      flight_instance: Flight_Instance | null;
      user: User;
    }
  ) {
    return await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        price,
        flight_instance: {
          connect: {
            id: flight_instance?.id,
          },
        },
        user: {
          connect: {
            cpf: user?.cpf,
          },
        },
      },
    });
  }

  static async delete(id: number) {
    return await prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}
