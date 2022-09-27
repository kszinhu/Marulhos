import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Ticket } from "../entities/Ticket.js";

export default class TicketDAO {
  static async all(args?: Prisma.TicketFindManyArgs): Promise<Ticket[]> {
    return await prisma.ticket.findMany(args);
  }

  static async create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return await prisma.ticket.create({ data });
  }

  static async get(args: Prisma.TicketFindFirstArgs): Promise<Ticket | null> {
    return await prisma.ticket.findFirst(args);
  }

  static async save(id: number, data: Ticket): Promise<Ticket> {
    return await prisma.ticket.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number): Promise<Ticket> {
    return await prisma.ticket.delete({
      where: { id },
    });
  }
}
