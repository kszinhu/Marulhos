import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Pilot } from "../entities/Pilot.js";

export default class PilotDAO {
  static async all(args?: Prisma.PilotFindManyArgs): Promise<Pilot[]> {
    return await prisma.pilot.findMany(args);
  }

  static async create(data: Prisma.PilotCreateInput): Promise<Pilot> {
    return await prisma.pilot.create({ data });
  }

  static async get(args: Prisma.PilotFindFirstArgs): Promise<Pilot | null> {
    return await prisma.pilot.findFirst(args);
  }

  static async save(cpf: string, data: Pilot): Promise<Pilot> {
    return await prisma.pilot.update({
      where: { cpf },
      data,
    });
  }

  static async delete(cpf: string): Promise<Pilot> {
    return await prisma.pilot.delete({
      where: { cpf },
    });
  }
}
