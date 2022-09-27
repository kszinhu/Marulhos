import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Terminal } from "../entities/Terminal.js";

export default class TerminalDAO {
  static async all(args?: Prisma.TerminalFindManyArgs): Promise<Terminal[]> {
    return await prisma.terminal.findMany(args);
  }

  static async create(data: Prisma.TerminalCreateInput): Promise<Terminal> {
    return await prisma.terminal.create({ data });
  }

  static async get(
    args: Prisma.TerminalFindFirstArgs
  ): Promise<Terminal | null> {
    return await prisma.terminal.findFirst(args);
  }

  static async save(id: number, data: Terminal): Promise<Terminal> {
    return await prisma.terminal.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number): Promise<Terminal> {
    return await prisma.terminal.delete({
      where: { id },
    });
  }
}
