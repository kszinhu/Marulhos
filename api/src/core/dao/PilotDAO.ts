import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { ModelDAO, validate } from "./BaseDAO.js";

import { Pilot } from "../entities/Pilot.js";

class PilotDAO implements ModelDAO<Pilot> {
  definition = {
    name: "Pilot",
    primary_key: {
      name: "cpf",
      validate: z.string(),
    },
    schemaValidator: z.object({
      cpf: z.string(),
      name: z.string(),
      last_name: z.string(),
      rg: z.string().optional(),
      sex: z.enum(["M", "F", "X"]),
      birth_date: z.date().optional(),
      address_cep: z.string(),
      address_number: z.string(),
      salary: z.number(),
      vaccination_number: z.number(),
      passport_number: z.number(),
      work_registration_number: z.number(),
      pilot_license_number: z.number(),
    }),
  };

  async all(args?: Prisma.PilotFindManyArgs): Promise<[number, Pilot[]]> {
    return await Promise.all([
      prisma.pilot.count(),
      prisma.pilot.findMany(args),
    ]);
  }

  async create(data: Prisma.PilotCreateInput): Promise<Pilot> {
    return await prisma.pilot.create({ data });
  }

  async get(args: Prisma.PilotFindFirstArgs): Promise<Pilot | null> {
    return await prisma.pilot.findFirst(args);
  }

  async save(cpf: string, data: Pilot): Promise<Pilot> {
    return await prisma.pilot.update({
      where: { cpf },
      data,
    });
  }

  async delete(cpf: string): Promise<Pilot> {
    return await prisma.pilot.delete({
      where: { cpf },
    });
  }

  validate(data: Pilot | Prisma.PilotCreateInput): boolean {
    return validate(data, this.definition.schemaValidator);
  }
}

export default new PilotDAO();
