import { Prisma } from "@prisma/client";
import { prisma } from "../lib/Prisma.js";

export default class Terminal {
  static async all() {
    return await prisma.terminal.findMany();
  }

  static async create(data: Prisma.TerminalCreateInput) {
    return await prisma.terminal.create({
      data,
    });
  }

  static async get(id: number) {
    return await prisma.terminal.findFirst({
      where: {
        id,
      },
    });
  }

  static async save(id: number, { capacity }: { capacity: number }) {
    return await prisma.terminal.update({
      where: {
        id,
      },
      data: {
        capacity,
      },
    });
  }

  static async delete(id: number) {
    return await prisma.terminal.delete({
      where: {
        id,
      },
    });
  }
}
