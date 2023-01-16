import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { z } from "zod";
import { ModelDAO, validate } from "./BaseDAO.js";

import { Fly_Attendant } from "../entities/FlyAttendant.js";

class FlyAttendantDAO implements ModelDAO<Fly_Attendant> {
  definition = {
    name: "Fly_Attendant",
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
    }),
  };

  async all(
    args?: Prisma.Fly_AttendantFindManyArgs
  ): Promise<[number, Fly_Attendant[]]> {
    return await Promise.all([
      prisma.fly_Attendant.count(),
      prisma.fly_Attendant.findMany(args),
    ]);
  }

  async create(data: Prisma.Fly_AttendantCreateInput): Promise<Fly_Attendant> {
    return await prisma.fly_Attendant.create({ data });
  }

  async get(
    args: Prisma.Fly_AttendantFindFirstArgs
  ): Promise<Fly_Attendant | null> {
    return await prisma.fly_Attendant.findFirst(args);
  }

  async save(cpf: string, data: Fly_Attendant): Promise<Fly_Attendant> {
    return await prisma.fly_Attendant.update({
      where: { cpf },
      data,
    });
  }

  async delete(cpf: string): Promise<Fly_Attendant> {
    return await prisma.fly_Attendant.delete({
      where: { cpf },
    });
  }

  validate(data: Fly_Attendant | Prisma.Fly_AttendantCreateInput): boolean {
    return validate(data, this.definition.schemaValidator);
  }
}

export default new FlyAttendantDAO();
