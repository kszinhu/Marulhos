import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { ModelDAO, validate } from "./BaseDAO.js";

import { Ticket } from "../entities/Ticket.js";

class TicketDAO implements ModelDAO<Ticket> {
  definition = {
    name: "Ticket",
    primary_key: {
      name: "id",
      validate: z.string(),
    },
    schemaValidator: z.object({
      price: z.number(),
      passenger_id: z.string(),
    }),
  };

  async all(args?: Prisma.TicketFindManyArgs): Promise<[number, Ticket[]]> {
    return await Promise.all([
      prisma.ticket.count(),
      prisma.ticket.findMany(args),
    ]);
  }

  async create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    return await prisma.ticket.create({ data });
  }

  async get(args: Prisma.TicketFindFirstArgs): Promise<Ticket | null> {
    return await prisma.ticket.findFirst(args);
  }

  async save(id: number, data: Ticket): Promise<Ticket> {
    return await prisma.ticket.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Ticket> {
    return await prisma.ticket.delete({
      where: { id },
    });
  }

  validate(data: Ticket | Prisma.TicketCreateInput): boolean {
    return validate(data, this.definition.schemaValidator);
  }
}

export default new TicketDAO();
