import { Prisma } from "@prisma/client";

import { z } from "zod";

import { prisma } from "../lib/prisma.js";
import { Terminal } from "../entities/Terminal.js";
import { ModelDAO, validate } from "./BaseDAO.js";

class TerminalDAO implements ModelDAO<Terminal> {
  definition = {
    name: "Terminal",
    primary_key: {
      name: "id",
      validate: z.string(),
    },
    schemaValidator: z.object({
      capacity: z.number(),
    }),
  };

  async all(args?: Prisma.TerminalFindManyArgs): Promise<[number, Terminal[]]> {
    return await Promise.all([
      prisma.terminal.count(),
      prisma.terminal.findMany(args),
    ]);
  }

  async create(data: Prisma.TerminalCreateInput): Promise<Terminal> {
    return await prisma.terminal.create({ data });
  }

  async get(args: Prisma.TerminalFindFirstArgs): Promise<Terminal | null> {
    return await prisma.terminal.findFirst(args);
  }

  async save(id: number, data: Terminal): Promise<Terminal> {
    return await prisma.terminal.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Terminal> {
    return await prisma.terminal.delete({
      where: { id },
    });
  }

  validate(data: Terminal | Prisma.PlaneCreateInput): boolean {
    return validate(data, this.definition.schemaValidator);
  }
}

export default new TerminalDAO();
