import { Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma.js";
import { Fly_Attendant } from "../entities/FlyAttendant.js";

export default class FlyAttendantDAO {
  static async all(
    args?: Prisma.Fly_AttendantFindManyArgs
  ): Promise<Fly_Attendant[]> {
    return await prisma.fly_Attendant.findMany(args);
  }

  static async create(
    data: Prisma.Fly_AttendantCreateInput
  ): Promise<Fly_Attendant> {
    return await prisma.fly_Attendant.create({ data });
  }

  static async get(
    args: Prisma.Fly_AttendantFindFirstArgs
  ): Promise<Fly_Attendant | null> {
    return await prisma.fly_Attendant.findFirst(args);
  }

  static async save(cpf: string, data: Fly_Attendant): Promise<Fly_Attendant> {
    return await prisma.fly_Attendant.update({
      where: { cpf },
      data,
    });
  }

  static async delete(cpf: string): Promise<Fly_Attendant> {
    return await prisma.fly_Attendant.delete({
      where: { cpf },
    });
  }
}
